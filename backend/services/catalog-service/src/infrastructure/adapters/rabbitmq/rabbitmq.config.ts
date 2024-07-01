interface RabbitMQConfig {
    url: string;
    exchanges: {
        [exchangeName: string]: {
            exchangeType: 'direct' | 'topic' | 'headers' | 'fanout';
            durable?: boolean;
        };
    };
    queues: {
        [queueName: string]: {
            name: string;
            exchange: string;
            routingKey?: string;
            isExclusive?: boolean;
            durable?: boolean;
        };
    };
}

const RABBITMQ_CONFIG: RabbitMQConfig = {
    url: 'amqps://arynovye:nQTOf41X0NXCsb44uzl8cKdu9tv8TuQp@puffin.rmq2.cloudamqp.com/arynovye',
    exchanges: {
        rpc_exchange: {
            exchangeType: 'direct',
            durable: true,
        },
        // topic_exchange: {
        //     exchangeType: 'topic',
        //     durable: true,
        // },
    },
    queues: {
        rpcRequestQueue: {
            name: 'rpc_request_queue',
            exchange: 'rpc_exchange',
            routingKey: 'rpc_request.*',
            durable: true,
        },
        rpcResponseQueue: {
            name: 'rpc_response_queue',
            exchange: 'rpc_exchange',
            routingKey: 'rpc_response.*',
            isExclusive: true,
            durable: false,
        },
        // productQueue: {
        //     name: 'product_queue',
        //     exchange: 'topic_exchange',
        //     routingKey: 'product.*',
        //     durable: true,
        // },
        // orderQueue: {
        //     name: 'order_queue',
        //     exchange: 'topic_exchange',
        //     routingKey: 'order.*',
        //     durable: true,
        // },
    },
};

export { RabbitMQConfig, RABBITMQ_CONFIG };
