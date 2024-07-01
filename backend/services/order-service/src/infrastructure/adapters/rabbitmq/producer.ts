import { Channel } from 'amqplib';
import { randomUUID } from 'crypto';
import { EventEmitter } from 'events';
import { injectable } from 'inversify';
import { RABBITMQ_CONFIG } from './rabbitmq.config';

@injectable()
export default class Producer extends EventEmitter {
    constructor(private channel: Channel, private eventEmitter: EventEmitter) {
        super()
    }

    public async rpcRequest(data: any, routingKey: string): Promise<any> {
        const uuid = randomUUID();
        console.log(`[Producer] Sending RPC request to ${RABBITMQ_CONFIG.queues.rpcRequestQueue.name}`);
        this.channel.sendToQueue(RABBITMQ_CONFIG.queues.rpcRequestQueue.name, Buffer.from(JSON.stringify(data)),
            {
                correlationId: uuid,
                replyTo: RABBITMQ_CONFIG.queues.rpcResponseQueue.name,
                headers: {
                    routingKey: `rpc.request.${routingKey}`
                }
            }
        );
        console.log(`[Producer] Sent RPC request to ${RABBITMQ_CONFIG.queues.rpcRequestQueue.name}`);
        return new Promise((resolve) => {
            this.eventEmitter.once(`reply-${uuid}`, (response) => {
                resolve(JSON.parse(response));
            });
        })
    }
}