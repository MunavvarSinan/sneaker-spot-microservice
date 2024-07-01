import { faker } from "@faker-js/faker"
import { Product } from "../../models/product.model";
import { Factory } from 'rosie'
import { generateId } from "@utils/generate-id";






export const ProductFactory = new Factory<Product>()
    .attr("id", generateId.generate())
    .attr("name", faker.commerce.productName())
    .attr("description", faker.commerce.productDescription())
    .attr("price", Number(faker.commerce.price()))
    .attr("stock", faker.number.int({ min: 10, max: 100 }))
