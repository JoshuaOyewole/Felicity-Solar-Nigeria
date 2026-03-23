
import { Metadata } from 'next'
import { Inter } from 'next/font/google';
//import React from 'react'
import "../../../globals.css"
import Login from '@/components/Login';
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: 'Admin Login - Felicity Solar',
    description: 'We have the best Solar products in town. Hybrid inverter, MPPT controller, Solar lithium battery, Gel battery, Solar all in one street light',
}

function AdminLoginPage() {
    return (
        <main className={`${inter.className} ${inter.variable} antialiased h-screen overflow-y-scroll`}>
            <Login />
        </main>
    )
}

export default AdminLoginPage