import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
 
const UpvoteSchema = z.object({
    streamId: z.string()
})

export async function POST(req: NextRequest){
    const session = await getServerSession();
    
    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    });
    // By default NextAuth gives you the email not the id 
    // TODO: Replace this with id everywhere
    if(!user){
        return NextResponse.json({
            message: "Unauthenticated",

        }, {
            status: 403
        })
    }

    try {
        const data = UpvoteSchema.parse(await req.json());
        await prisma.upvote.create({
            data: {
                userId: user.id,
                StreamId: data.streamId
            }
        })
    }
    catch(e){
        return NextResponse.json({
            message: "Upvoting twice"
        }, {
            status: 403
        })

    }

}