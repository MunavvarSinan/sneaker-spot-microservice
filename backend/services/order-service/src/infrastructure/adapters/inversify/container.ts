import { Container } from "inversify";

import { TYPES } from "./types";
import { RabbitMQClient } from "../rabbitmq";
import { CartRoutes } from "@api/cart.routes";

const container = new Container();

/**
 * using types is for injecting the dependencies
 * toSelf is like singleton pattern ( using the same instance of the class )
 */

container.bind(TYPES.RabbitMQClient).to(RabbitMQClient).inSingletonScope();
container.bind(TYPES.CartRoutes).to(CartRoutes).inSingletonScope();

export { container };
