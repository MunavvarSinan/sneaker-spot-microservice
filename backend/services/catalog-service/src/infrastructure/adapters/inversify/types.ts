const TYPES = {
    ICatalogRepository: Symbol.for("ICatalogRepository"),
    CatalogService: Symbol.for("CatalogService"),
    CatalogRoutes: Symbol.for("CatalogRoutes"),
    Consumer: Symbol.for("Consumer"),
    Producer: Symbol.for("Producer"),
    RabbitMQClient: Symbol.for("RabbitMQClient"),
    MessageHandler: Symbol.for("MessageHandler"),
};

export { TYPES };
