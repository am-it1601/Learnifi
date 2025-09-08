import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new UploadThingError("Unauthorized");
  }
  return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlu
  courseImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async() => await handleAuth())
    .onUploadComplete(async({ file, metadata }) => {
      console.log(
        "✅ courseImage uploaded:",
        file.ufsUrl,
        "by user:",
        metadata.userId
      );
      return { url: file.ufsUrl }; // optional return data to client
    }),
    
  courseAttachment: f(["text", "pdf", "video", "audio", "image"])
    .middleware(() => handleAuth())
    .onUploadComplete(({ file, metadata }) => {
      console.log(
        "✅ attachment uploaded:",
        file.ufsUrl,
        "by user:",
        metadata.userId
      );
      return { url: file.ufsUrl };
    }),

  chapterVideo: f({
    video: {
      maxFileSize: "512GB",
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(({ file, metadata }) => {
      console.log(
        "✅ chapter video uploaded:",
        file.ufsUrl,
        "by user:",
        metadata.userId
      );
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
