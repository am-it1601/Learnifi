"use client";

import dynamic from "next/dynamic";
import React from "react";

import "react-quill-new/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const EditorComponent = ({ onChange, value }: EditorProps) => {
  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

EditorComponent.displayName = "Editor";

export const Editor = React.memo(EditorComponent);
