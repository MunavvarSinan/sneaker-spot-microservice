import { Channel, ConsumeMessage } from 'amqplib';
import { EventEmitter } from 'events';
import { RABBITMQ_CONFIG } from './rabbitmq.config';

export default class Consumer extends EventEmitter {
    constructor(private channel: Channel, private eventEmitter: EventEmitter) {
        super();
    }

    async rpcConsumer() {
        await this.channel.consume(RABBITMQ_CONFIG.queues.rpcResponseQueue.name, (msg: ConsumeMessage | null) => {
            if (msg) {
                const correlationId = msg.properties.correlationId;
                this.eventEmitter.emit(`reply-${correlationId}`, msg.content.toString());
            }
        }, { noAck: true });
    }
}
