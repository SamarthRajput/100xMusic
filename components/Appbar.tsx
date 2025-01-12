"use client";
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import Image from "next/image";
import Music from "@/public/music-4.svg"

export const Appbar = () => {
    // How do I know that the user is logged in 
    // NextAuth / React library gets you a variable called session
    // the useSession() hook that returns the session variable 
    const session = useSession();
    const router = useRouter();

    return <div className="flex justify-between px-20 pt-4">
        <div className="flex items-center justify-between">
            <div className="flex cursor-pointer text-2xl" onClick={() => {
                router.push("/")
            }}>
                {/* <Image src={Logo} alt="" className="h-7 w-10"></Image> */}
                100x 
                    <Image src={Music} alt="" className="font-white"></Image>
            </div>
        </div>

        <div>
            {/* If the user is logged in we should render a logout button */}
            {session.data?.user && <button onClick={() => signOut()} className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex">Log Out</button>}
            {/* if the user doesnt exist we should render the signin button */}
            {!session.data?.user && <button onClick={() => signIn()} className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">signIn</button>}
        </div>
    </div>
}