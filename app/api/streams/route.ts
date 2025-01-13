import { NextRequest, NextResponse } from "next/server";
import { number, string, z } from "zod";
import prisma from "@/lib/db";
// @ts-ignore
import youtubesearchapi  from "youtube-search-api";


var YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

// From this url, we have parse out the youtube or spotify url
const createStreamSchema = z.object({
    creatorId:  z.string(),
    url: z.string()     //Make sure the url contains youtube or spotify inside 
})

export async function POST(req: NextRequest) {
    // if the data the user is sending is not correct, then there will be an error thrown on this line
    try{
        const data = createStreamSchema.parse(await req.json());
        // Checks whether the url is correct, check whether its follow the youtube url format or not 
        const isYoutube = data.url.match(YT_REGEX);
        if(!isYoutube){
            return NextResponse.json({
                message: "Wrong url format "
            }, {
                status: 411
            }) 
        }
        
        //  here we need to extract the id, we need to do the regex, regex stands for regular expressions
        const extractedId = data.url.split("?v=")[1];

        // given the extractedId we can get vdo details such as title and thumbnail
        const response = await youtubesearchapi.GetVideoDetails(extractedId);
        console.log(response.title);
        const thumbnails = response.thumbnail.thumbnails ;
        thumbnails.sort((a: {width: Number}, b: {width:Number}) => a.width < b.width ? -1 : 1);

        const stream = await prisma.stream.create({
            data:{
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: response.title ?? "Cant find video",
                smallImg: (thumbnails.length > 1 ?  thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "https://www.codelikethewind.org/content/images/size/w2000/2022/05/hello_world.png", 
                bigImg: thumbnails[thumbnails.length - 1].url ?? "https://www.codelikethewind.org/content/images/size/w2000/2022/05/hello_world.png"
            }
        });

        return NextResponse.json({
            message: "Added Stream",
            id: stream.id
        })
    } catch(e){
        console.log(e);
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 411
        }) 
    }


}

export async function GET(req: NextRequest){
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prisma.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    })

    return NextResponse.json({
        streams
    })
}