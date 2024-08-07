import React from 'react'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Heading } from '../typography/headings'
import ProductCard from '../product-card'

type Props = {}


const products = [
    {
        id: 1,
        name: 'Black Basic Tee',
        price: 7678,
        sale_price: 5676,
        href: '#',
        category: 'Men\'s shoes',
        imageSrc: '/assets/images/shoes/shoe-1.png',
        imageAlt: "Model wearing women's black cotton crewneck tee.",
    },
    {
        id: 2,
        name: 'Black Basic Tee',
        price: 7678,
        href: '#',
        category: 'Men\'s shoes',
        imageSrc: '/assets/images/shoes/shoe-2.png',
        imageAlt: "Model wearing women's black cotton crewneck tee.",
    },
    {
        id: 3,
        name: 'Black Basic Tee',
        price: 7678,
        href: '#',
        category: 'Men\'s shoes',
        imageSrc: '/assets/images/shoes/shoe-3.png',
        imageAlt: "Model wearing women's black cotton crewneck tee.",
    },
    {
        id: 4,
        name: 'Black Basic Tee',
        price: 7678,
        href: '#',
        category: 'Men\'s shoes',
        imageSrc: '/assets/images/shoes/shoe-3.png',
        imageAlt: "Model wearing women's black cotton crewneck tee.",
    },
    {
        id: 5,
        name: 'Black Basic Tee',
        price: 7678,
        href: '#',
        category: 'Men\'s shoes',
        imageSrc: '/assets/images/shoes/shoe-3.png',
        imageAlt: "Model wearing women's black cotton crewneck tee.",
    },
    {
        id: 6,
        name: 'Black Basic Tee',
        price: 7678,
        href: '#',
        category: 'Men\'s shoes',
        imageSrc: '/assets/images/shoes/shoe-3.png',
        imageAlt: "Model wearing women's black cotton crewneck tee.",
    },
    // More products...
]

const ShopBySport = (props: Props) => {
    return (
        <Carousel
            opts={{
                align: "center",
            }}
            className="max-w-[120rem] p-5 mt-16"
        >
            <div className='flex justify-between items-baseline'>
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <Heading variant="subheading" size="h2" as="h2">
                        Shop By Sport
                    </Heading>
                </div>
                <div className='flex px-2 justify-end space-x-3 pb-2'>
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </div>
            <CarouselContent>
                {products.map((product, index) => (
                    <CarouselItem key={index} className="basis-2/4 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <ProductCard
                                key={product.id}
                                product={product}
                                imgHeight={424}
                                imgWidth={424}
                                variant="gridCenter"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>)
}

export default ShopBySport