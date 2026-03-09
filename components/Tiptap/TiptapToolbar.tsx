"use client";

import {
  Bold,
  Italic,
  ALargeSmall, 
  CaseSensitive,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Icon,
} from "lucide-react";

import { Editor } from "@tiptap/react";
import { Toggle } from "../ui/toggle";

type Props = {
  editor: Editor | null;
};

export default function TiptapToolbar({ editor }: Props) {
  if (!editor) return null;

  const options = [
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <ALargeSmall className="size-4" />,
      onClick: () => editor.commands.setParagraph(),
      pressed: editor.isActive("paragraph"),
    },
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("BulletList"),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("OrderedList"),
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 space-x-2 z-50">
      {options.map((option, index) => (
        <Toggle key={index} pressed={option.pressed} onPressedChange={option.onClick}>
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}
