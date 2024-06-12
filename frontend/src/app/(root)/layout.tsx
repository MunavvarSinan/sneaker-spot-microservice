import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

function RootLayout({ children }: Props) {
    return (
        <div className="divide-y divide-gray-200">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default RootLayout