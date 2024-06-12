import { stagger, useAnimate } from "framer-motion"
import { useEffect } from "react"

export const NAV_LINKS = [
    { id: '1', name: "Home", href: "/" },
    { id: '2', name: "Men", href: "/men" },
    { id: '3', name: "Features", href: "/features" },
    { id: '4', name: "Docs", href: "/docs" },
    { id: '5', name: "Blog", href: "/blog" }
]


export function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate()

    useEffect(() => {
        const menuAnimations = isOpen
            ? [
                [
                    'nav',
                    { opacity: 1, x: 0 },
                    {
                        ease: [0.08, 0.65, 0.53, 0.96],
                    },
                ],
                [
                    'li',
                    { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' },
                    { delay: stagger(0.05), at: '-0.1' },
                ],
            ]
            : [
                [
                    'li',
                    { transform: 'scale(0.5)', opacity: 0, filter: 'blur(10px)' },
                    { delay: stagger(0.05, { from: 'last' }), at: '<' },
                ],
                ['nav', { x: '100%' }, { at: '-0.3' }],
            ]
        // @ts-expect-error - TODO: Fix this
        animate([...menuAnimations])
    }, [animate, isOpen])

    return scope
}
