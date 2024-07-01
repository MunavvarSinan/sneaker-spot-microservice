import { Container } from "inversify";
import { CatalogService } from "@services/catalog.service";
import { CatalogRepository } from "@repository/catalog.repository";
import { ICatalogRepository } from "@interface/catalog.interface";
import { CatalogRoutes } from "../../../api/catalog.routes";
import { TYPES } from "./types";
import Consumer from "../rabbitmq/consumer";
import MessageHandler from "../rabbitmq/message-handler";
import { Message } from "amqplib";

const container = new Container();

/**
 * using types is for injecting the dependencies
 * toSelf is like singleton pattern ( using the same instance of the class )
 */
container.bind<ICatalogRepository>(TYPES.ICatalogRepository).to(CatalogRepository);
container.bind<CatalogService>(CatalogService).toSelf();
container.bind<CatalogRoutes>(CatalogRoutes).toSelf();
container.bind<Consumer>(TYPES.Consumer).to(Consumer)
container.bind<MessageHandler>(MessageHandler).toSelf()

export { container };
