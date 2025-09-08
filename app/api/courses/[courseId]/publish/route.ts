import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ courseId: string; }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { courseId } = await params;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include:{
        chapters:{
          include:{
            muxData: true
          }
        }
      }
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

  const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished)

   

    if (
      !course ||
      !course.title ||
      !course.description ||
      !course.imageUrl||
      !hasPublishedChapter 
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id:courseId,
        userId
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("COURSE_ID_PUBLISH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
