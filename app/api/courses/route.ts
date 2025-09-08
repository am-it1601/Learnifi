import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        const  {title}  = await request.json();
        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const course = await db.course.create({
            data: {
                title,
                userId,
            }
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}