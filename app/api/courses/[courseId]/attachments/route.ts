import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { userId } = await auth();
    const { url } = await request.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
     const {courseId} = await params
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("Error in creating attachment", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
