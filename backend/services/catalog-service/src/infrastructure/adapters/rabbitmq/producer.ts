import { Channel } from 'amqplib';
import { randomUUID } from 'crypto';
import { EventEmitter } from 'events';
import { injectable } from 'inversify';
import { RABBITMQ_CONFIG } from './rabbitmq.config';

@injectable()
export default class Producer extends EventEmitter {
    constructor(private channel: Channel) {
        super()
    }

    public async rpcRequest(data: any): Promise<any> {
        console.log('Got the request')
        const uuid = randomUUID();
        // this.channel.sendToQueue(RABBITMQ_CONFIG.queues.rpcRequestQueue.name, Buffer.from(data),
        //     {
        //         correlationId: uuid,
        //         replyTo: RABBITMQ_CONFIG.queues.rpcResponseQueue.name,
        //         headers: { routingKey: RABBITMQ_CONFIG.queues.rpcRequestQueue.routingKey }
        //     }

        // );
        const routingKey = 'rpc_request.getProductDetails '
        this.channel.publish(
            'rpc_exchange', // Specify the exchange name
            routingKey, // Specify the routing key
            Buffer.from(JSON.stringify(data)),
            {
                correlationId: uuid,
                replyTo: RABBITMQ_CONFIG.queues.rpcResponseQueue.name // Specify the reply-to queue name
            }
        );
        console.log(`Sending RPC request to queue ${RABBITMQ_CONFIG.queues.rpcRequestQueue.name} with correlationId ${uuid}`);
        return new Promise((resolve) => {
            this.once(`reply-${uuid}`, (data) => {
                const response = JSON.parse(data.content.toString())
                resolve(response)
            })
        })
    }

    // async sendMessageAndWaitForReply(data: any, exchange: string, routingKey: string, operation: string) {
    //     try {
    //         const uuid = randomUUID();
    //         const { queue: replayQueue } = await this.channel.assertQueue('', { exclusive: true })

    //         this.channel.sendToQueue(
    //             'test',
    //             Buffer.from(data),
    //             {
    //                 replyTo: replayQueue,
    //                 correlationId: uuid
    //             }
    //         )
    //         return new Promise((resolve, reject) => {
    //             this.once(`reply-${uuid}`, (data) => {
    //                 const reply: any = JSON.parse(data.content.toString());
    //                 resolve(reply);
    //             });

    //             setTimeout(() => {
    //                 reject(new Error('Request timed out'));
    //             }, 10000);
    //         });
    //     } catch (err) {
    //         throw new Error("Error in sendMessageAndWaitForReply");
    //     }
    // }

    // async sendReply(data: any, correlationId: string, replyToQueue: string) {
    //     this.channel.sendToQueue(
    //         replyToQueue,
    //         Buffer.from(JSON.stringify(data)),
    //         {
    //             correlationId: correlationId
    //         }
    //     );
    // }
}
