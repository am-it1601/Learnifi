"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill-new/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

// const ReactQuill =  dynamic(() => import('react-quill-new'), {ssr: false})


export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );

  return <ReactQuill theme="snow" value={value} readOnly />;
};
