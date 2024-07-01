import { connect, Connection, Channel } from 'amqplib';
import { injectable } from 'inversify';
import Producer from './producer';
import Consumer from './consumer';
import { RABBITMQ_CONFIG } from './rabbitmq.config';
import EventEmitter from 'events';

@injectable()
class RabbitMQClient {
    private static instance: RabbitMQClient;
    private connection!: Connection;
    private channels: Map<string, Channel> = new Map();
    public rpcProducer!: Producer;
    public rpcConsumer!: Consumer;
    private initialized: boolean = false;
    public eventEmitter!: EventEmitter
    constructor() { }

    public static getInstance(): RabbitMQClient {
        if (!this.instance) {
            this.instance = new RabbitMQClient();

        }
        return this.instance;
    }

    public async initialize(): Promise<void> {
        if (this.initialized) return;

        if (!this.connection) {
            this.connection = await connect(RABBITMQ_CONFIG.url)
            this.connection.on('error', (err) => {
                console.log(err);
            });
        }
        this.eventEmitter = new EventEmitter();

        await Promise.all(Object.entries(RABBITMQ_CONFIG.queues).map(async ([queueName, queueConfig]) => {
            const { exchange, durable, isExclusive, routingKey } = queueConfig;
            const channel = await this.createChannel(exchange, routingKey, isExclusive, durable);
            await channel.assertQueue(queueConfig.name, { durable });
            this.channels.set(queueConfig.name, channel);
        }));

        const rpcProducerChannel = await this.getChannel(RABBITMQ_CONFIG.queues.rpcRequestQueue.name);
        this.rpcProducer = new Producer(rpcProducerChannel, this.eventEmitter);

        const rpcConsumerChannel = await this.getChannel(RABBITMQ_CONFIG.queues.rpcResponseQueue.name);
        this.rpcConsumer = new Consumer(rpcConsumerChannel, this.eventEmitter);

        await this.rpcConsumer.rpcConsumer();

        this.initialized = true;
    }

    private async createChannel(exchange: string, routingKey: string | undefined, isExclusive: boolean = false, durable?: boolean): Promise<Channel> {
        const channel = await this.connection.createChannel();
        await channel.assertExchange(
            exchange,
            RABBITMQ_CONFIG.exchanges[exchange].exchangeType,
            { durable: RABBITMQ_CONFIG.exchanges[exchange].durable }
        );

        if (routingKey) {
            await channel.assertQueue('', { exclusive: !!isExclusive, durable: !!durable });
            await channel.bindQueue('', exchange, routingKey);
        }

        return channel;
    }

    public async getChannel(queueName: string): Promise<Channel> {
        if (!this.channels.has(queueName)) {
            throw new Error(`Channel for queue ${queueName} not found. Ensure it is created first.`);
        }
        return this.channels.get(queueName)!;
    }

    public async close(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
            this.channels.clear();
            this.initialized = false;
        }
    }
}

export { RabbitMQClient, RABBITMQ_CONFIG };
