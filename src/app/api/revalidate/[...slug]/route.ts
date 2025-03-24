import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string[] } }
) {
    const apiKey = req.headers.get('X-Api-Key')
    const slug = (params.slug as string[]).join('/');
    const path = '/' + slug;

    console.log(path)

    // const corsHeaders = {
    //     'Access-Control-Allow-Origin': '*', // Allow all origins, you can restrict this to specific origins
    //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    //     'Access-Control-Allow-Headers': 'X-Api-Key, Content-Type',
    // };


    if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
        return NextResponse.json(
            { message: 'Invalid token' },
            {
                status: 200,
                // headers: corsHeaders,
            }
        );
    }

    try {
        revalidatePath(path);
        return NextResponse.json({
            revalidated: true,
            page: path,
        });
    } catch (err) {
        return NextResponse.json('Error revalidating', {
            status: 500,
        });
    }
}
