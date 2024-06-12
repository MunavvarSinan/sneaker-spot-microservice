import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva(
    "font-medium tracking-tight",
    {
        variants: {
            variant: {
                main: "font-extrabold font-haveltica-black tracking-wider",
                subheading: "tracking-tight",
                center: "text-center",
                product: "text-gray-900",
            },
            size: {
                h1: "text-[3rem] leading-[2.8rem] lg:text-8xl",
                h2: "text-2xl md:text-4xl",
                h3: "text-4xl sm:text-5xl",
                h4: "text-3xl sm:text-4xl",
                h5: "text-2xl md:text-4xl",
                h6: "text-xl sm:text-2xl",
            },
        },
        defaultVariants: {
            variant: "subheading",
            size: "h2",
        },
    }
);

export interface HeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
    as?: React.ElementType;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, variant, size, as: Component = "h2", ...props }, ref) => {
        return (
            <Component
                className={cn(headingVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Heading.displayName = "Heading";

export { Heading, headingVariants };
