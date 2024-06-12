declare enum Role {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
}

declare type TypedRequest<
    ReqBody = Record<string, unknown>,
    QueryString = Record<string, unknown>
> = Request<
    Record<string, unknown>,
    Record<string, unknown>,
    DeepPartial<ReqBody>,
    DeepPartial<QueryString>
>;
