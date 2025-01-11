import { NEXT_AUTH } from "@/app/lib/auth";
import NextAuth from "next-auth";
// All the get and the post request are handled by this handler 
const handler = NextAuth(NEXT_AUTH);


// export {handler as GET, handler as POST } 
export const GET = handler;
export const POST = handler;

