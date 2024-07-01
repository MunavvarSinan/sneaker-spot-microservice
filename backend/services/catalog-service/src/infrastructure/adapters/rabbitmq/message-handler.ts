import { Channel, ConsumeMessage } from 'amqplib';
import { RABBITMQ_CONFIG } from './rabbitmq.config';
import { inject, injectable } from 'inversify';
import { CatalogService } from '@services/catalog.service';

@injectable()
export default class MessageHandler {

    constructor(
        @inject(CatalogService) private service: CatalogService
    ) { }

    async handleMessage(message: any, routingKey: string) {
        let response = {};

        switch (true) {
            case /^rpc\.request\..*/.test(routingKey):
                response = await this.handleRpcRequest(message, routingKey);
                break;
            case /^product\..*/.test(routingKey):
                response = await this.handleProductMessage(message, routingKey);
                break;
            default:
                response = { error: 'Unknown routing key' };
                break;
        }
        return response;
    }

    private async handleRpcRequest(message: any, routingKey: string) {
        console.log(`Handling RPC request with routing key: ${routingKey}`);
        let response = {};

        switch (true) {
            case /^rpc\.request\.getProductDetails/.test(routingKey):
                response = this.service.getProduct(message.productId);
                break;
            case /^rpc\.request\.update/.test(routingKey):
                response = { data: 'Update RPC request response', message };
                break;
            case /^rpc\.request\.delete/.test(routingKey):
                response = { data: 'Delete RPC request response', message };
                break;
            default:
                response = { error: 'Unknown RPC request routing key' };
                break;
        }
        return response;
    }

    private async handleProductMessage(message: any, routingKey: string) {
        console.log(`Handling product message with routing key: ${routingKey}`);
        let response = {};

        switch (true) {
            case /^product\.create/.test(routingKey):
                response = { data: 'Create product response', message };
                break;
            case /^product\.update/.test(routingKey):
                response = { data: 'Update product response', message };
                break;
            case /^product\.delete/.test(routingKey):
                response = { data: 'Delete product response', message };
                break;
            default:
                response = { error: 'Unknown product routing key' };
                break;
        }
        return response;
    }
}