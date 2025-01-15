"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// If the user is logged in this Redirect component takes the user to the dashboard page 

export function Redirect(){
    const session = useSession();  
    const router = useRouter();


    useEffect(() => {
        if(session.data?.user){
            router.push("/dashboard");
        }   
    }, [session]);


    return null;
}