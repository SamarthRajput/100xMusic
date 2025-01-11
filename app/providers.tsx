// 1. make the provider.tsx a client component
"use client";
// Whenever you are using NextAuth or in the future you might use recoil, themes, ThemeProvider
// All of these providers are need to be run on client, All of these providers need to wrap your full application


import { SessionProvider } from "next-auth/react";


// 2. Create a Providers function which wraps everything inside a sessionprovider
export function Providers({ children }: {
    children: React.ReactNode
}) {
    return <SessionProvider>
        { children }
    </SessionProvider>
}