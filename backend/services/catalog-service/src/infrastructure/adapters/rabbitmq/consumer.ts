import { Channel, ConsumeMessage, Message } from 'amqplib';
import { RABBITMQ_CONFIG } from './rabbitmq.config';
import MessageHandler from './message-handler';
import { inject, injectable } from 'inversify';
import { container } from '../inversify/container';

@injectable()
class Consumer {
    private channel: Channel;

    private messageHandler: MessageHandler;

    constructor(
        channel: Channel,
    ) {
        this.channel = channel;
        this.messageHandler = container.get(MessageHandler);
    }

    public async rpcConsumer(): Promise<void> {
        await this.channel.consume(RABBITMQ_CONFIG.queues.rpcRequestQueue.name, async (msg: ConsumeMessage | null) => {
            if (msg) {
                const { correlationId, replyTo } = msg.properties
                const requestData = JSON.parse(msg.content.toString())
                const routingKey = msg.properties.headers?.routingKey;

                const response = await this.messageHandler.handleMessage(requestData, routingKey);

                this.channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(response)), {
                    correlationId: correlationId
                });
                this.channel.ack(msg);
            }
        }, { noAck: false });
    }
}

export default Consumer;
