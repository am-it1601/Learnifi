"use client"

import axios from "axios";
import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  isLocked: boolean;
  completedOnEnd: boolean;
  title: string;
  nextChapterId?: string;
}

export const VideoPlayer = ({
  chapterId,
  completedOnEnd,
  courseId,
  isLocked,
  playbackId,
  title,
  nextChapterId,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter()
  const confetti = useConfettiStore()

  const onEnd = async() => {
    try {
        
        if (completedOnEnd) {
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,
                {isCompleted: true}
            )
        }

        if (!nextChapterId) {
            confetti.onOpen()
        }

        toast.success("Progress updated")
        router.refresh()

        if (nextChapterId) {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
        }
    } catch {
        toast.error("Something went wrong")
    }
  }

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};
