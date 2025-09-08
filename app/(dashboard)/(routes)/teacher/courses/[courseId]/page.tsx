import { Actions } from "@/app/(dashboard)/_components/actions";
import { AttachmentForm } from "@/app/(dashboard)/_components/attachment-form";
import { CategoryForm } from "@/app/(dashboard)/_components/category-form";
import { ChaptersForm } from "@/app/(dashboard)/_components/chapters-form";
import { DescriptionForm } from "@/app/(dashboard)/_components/description-form";
import { ImageForm } from "@/app/(dashboard)/_components/image-form";
import { PriceForm } from "@/app/(dashboard)/_components/price-form";
import { TitleForm } from "@/app/(dashboard)/_components/title-form";
import { Banner } from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const { courseId } = await params;

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: { position: "asc" },
      },
      attachments: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields{completionText}
            </span>
          </div>
          <Actions
            coursedId={courseId}
            disabled={!isComplete}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-16 gap-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} size="sm" />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm courseId={course.id} initialData={course} />
            <DescriptionForm courseId={course.id} initialData={course} />
            <ImageForm courseId={course.id} initialData={course} />
            <CategoryForm
              courseId={course.id}
              initialData={course}
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm courseId={course.id} initialData={course} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm courseId={course.id} initialData={course} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources $ Attachments</h2>
              </div>
              <AttachmentForm courseId={course.id} initialData={course} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
