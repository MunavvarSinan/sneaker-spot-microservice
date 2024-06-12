import cn from "classnames";
import Image from "next/image";
import type { FC } from "react";
import usePrice from "@/utils/use-price";

interface ProductProps {
    product: any;
    className?: string;
    contactClassName?: string;
    imageContentClassName?: string;
    variant?: "grid" | "gridSlim" | "list" | "listSmall" | "gridCenter" | "gridCategory";
    imgWidth?: number
    imgHeight?: number
    imgLoading?: "eager" | "lazy";
}

const ProductCard: FC<ProductProps> = ({
    product,
    className = "",
    contactClassName = "",
    imageContentClassName = "",
    variant = "list",
    imgWidth = 540,
    imgHeight = 640,
    imgLoading,
}) => {
    const { price, basePrice, discount } = usePrice({
        amount: product.sale_price ? product.sale_price : product.price,
        baseAmount: product.price,
        currencyCode: "INR",
    });

    return (
        <div
            className={cn(
                "group box-border overflow-hidden flex flex-col rounded-md cursor-pointer",
                {
                    "pe-0 pb-2 lg:pb-3 flex-col  bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product":
                        variant === "grid",
                    "pe-0 md:pb-1 flex-col  ": variant === "gridSlim",
                    "items-center bg-transparent border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct":
                        variant === "listSmall",
                    "flex-row items-center transition-transform ease-linear bg-gray-200 pe-2 lg:pe-3 2xl:pe-4":
                        variant === "list",
                    "flex-col  bg-gray-100": variant === "gridCenter",
                },
                className
            )}
            role="button"
            title={product?.name}
        >
            <div
                className={cn(
                    "flex",
                    {
                        "mb-3 md:mb-3.5": variant === "grid",
                        "mb-3 md:mb-3.5 pb-0": variant === "gridSlim",
                        "flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44": variant === "listSmall",
                        "mb-3": variant === "gridCenter",
                    },
                    imageContentClassName
                )}
            >
                <Image
                    src={product?.imageSrc}
                    height={imgHeight}
                    width={imgWidth}
                    loading={imgLoading}
                    quality={100}
                    layout="responsive"
                    alt={product?.name || "Product Image"}
                    className={cn("bg-gray-300 object-cover rounded-s-md", {
                        "w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none":
                            variant === "grid",
                        "rounded-md":
                            // "rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
                            variant === "gridSlim",
                        "rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105":
                            variant === "list",
                        "w-full rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
                            variant === "gridCenter",
                    })}
                />
            </div>
            <div
                className={cn(
                    "w-full overflow-hidden",
                    {
                        "ps-0 lg:ps-2.5 xl:ps-4 pe-2.5 xl:pe-4": variant === "grid",
                        "ps-0": variant === "gridSlim",
                        "px-4 lg:px-5 2xl:px-4": variant === "listSmall",
                        "px-4 lg:px-5 2xl:px-5": variant === "list",
                        "z-50 mt-[-3rem] mb-[2rem] lg:mt-[-6rem] lg:mb-[5rem]": variant === "gridCenter",
                    },
                    contactClassName
                )}
            >
                {variant !== "gridCenter" && product?.category && (

                    <h2
                        className={cn("font-normal truncate mb-1", {
                            "text-xl lg:text-2xlS": variant === "grid",
                            "md:mb-1.5 text-sm px-3 sm:text-base md:text-xl lg:text-3xl":
                                variant === "gridSlim",
                            "text-sm sm:text-base md:mb-1.5 pb-0": variant === "listSmall",
                            "text-sm sm:text-base md:text-sm lg:text-base xl:text-lg md:mb-1.5":
                                variant === "list",
                            // "text-4xl lg:text-6xl text-center tracking-wide font-haveltica-black": variant === "gridCenter",
                        })}
                    >
                        {product?.name}
                    </h2>
                )}
                {variant !== "gridCenter" && product?.category && (
                    <p className="text-sm px-3 lg:text-md leading-normal xl:leading-relaxed max-w-[250px] text-[#707072]">
                        {product?.category}
                    </p>
                )}
                {variant !== "gridCenter" && (
                    <div
                        className={`px-3 text-heading font-normal text-sm sm:text-base mt-1.5 space-x-2`}
                    >
                        <span
                            className={`inline-block text-lg ${variant === "grid"
                                ? "lg:text-xl lg:mt-2.5"
                                : "sm:text-xl md:text-base lg:text-xl md:mt-2.5 2xl:mt-3"
                                }`}
                        >
                            {price}
                        </span>
                        {discount && (
                            <del
                                className={`sm:text-base font-normal text-gray-800 ${variant === "grid"
                                    ? "lg:text-md lg:mt-2.5"
                                    : "sm:text-lg md:text-base lg:text-md md:mt-2.5 2xl:mt-3"
                                    }`}
                            >
                                {basePrice}
                            </del>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
