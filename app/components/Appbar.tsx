"use client";
import { signIn, signOut, useSession } from "next-auth/react"

export const Appbar = () => {
    // How do I know that the user is logged in 
    // NextAuth / React library gets you a variable called session
    // the useSession() hook that returns the session variable 
    const session = useSession();
    return <div className="flex justify-between bg-white">
        <div className="text-blue-700 ">
            100xMusic
        </div>

        <div>
            {/* If the user is logged in we should render a logout button */}
            {session.data?.user && <button onClick={() => signOut()} className="m-2 p-2 bg-blue-400">Log Out</button>}
            {/* if the user doesnt exist we should render the signin button */}
            {!session.data?.user && <button onClick={() => signIn()} className="m-2 p-2 bg-blue-400">signIn</button>}
        </div>
    </div>
}