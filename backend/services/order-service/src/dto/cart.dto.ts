import { Static, Type } from "@sinclair/typebox";

export const CartRequestSchema = Type.Object({
    productId: Type.String(),
    customerId: Type.String(),
    qty: Type.Integer()
})

export type CartRequestInput = Static<typeof CartRequestSchema>

export const CartEditRequestSchema = Type.Object({
    id: Type.String(),
    qty: Type.Integer()
})

export type CartEditRequestInput = Static<typeof CartEditRequestSchema>

