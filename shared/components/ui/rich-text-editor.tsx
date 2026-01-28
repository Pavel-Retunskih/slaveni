'use client'

import { useCallback, useEffect, useMemo, useRef } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading,
  Alignment,
  List,
  TodoList,
  BlockQuote,
  Link,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageResize,
  ImageResizeEditing,
  ImageResizeHandles,
  ImageResizeButtons,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  Code,
  CodeBlock,
  HorizontalLine,
  Autoformat,
  AutoLink,
  Mention,
  ImageStyleConfig,
  type Editor,
  type FileRepository,
  type AlignmentConfig,
  type HeadingOption,
} from "ckeditor5"

import "ckeditor5/ckeditor5.css"
import { uploadFile } from "@/shared/helpers/uploadFile"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const headingOptions: HeadingOption[] = [
  { model: "paragraph", title: "Параграф", class: "ck-heading_paragraph" },
  { model: "heading1", view: "h2", title: "Заголовок 1", class: "ck-heading_heading1" },
  { model: "heading2", view: "h3", title: "Заголовок 2", class: "ck-heading_heading2" },
  { model: "heading3", view: "h4", title: "Заголовок 3", class: "ck-heading_heading3" },
]

const alignmentConfig: AlignmentConfig = {
  options: ["left", "center", "right", "justify"],
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<Editor | null>(null)
  const lastSyncedValueRef = useRef(value)

  const editorConfig = useMemo(() => ({
    plugins: [
      Essentials,
      Paragraph,
      Bold,
      Italic,
      Underline,
      Strikethrough,
      Heading,
      Alignment,
      List,
      TodoList,
      BlockQuote,
      Link,
      Image,
      ImageCaption,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      ImageResizeEditing,
      ImageResizeHandles,
      ImageResizeButtons,
      Table,
      TableToolbar,
      TableProperties,
      TableCellProperties,
      Code,
      CodeBlock,
      HorizontalLine,
      Autoformat,
      AutoLink,
      Mention,
    ],
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "alignment:left",
      "alignment:center",
      "alignment:right",
      "alignment:justify",
      "|",
      "bulletedList",
      "numberedList",
      "todoList",
      "|",
      "blockQuote",
      "code",
      "codeBlock",
      "horizontalLine",
      "|",
      "link",
      "insertImage",
      "insertTable",
      "|",
      "undo",
      "redo",
    ],
    image: {
      toolbar: [
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:alignLeft",
        "imageStyle:alignRight",
        "imageStyle:alignCenter",
        "|",
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "resizeImage",
        "resizeImage:original",
        "resizeImage:50",
        "resizeImage:75",
      ],
      styles: {
        options: ["inline", "block", "alignLeft", "alignCenter", "alignRight"],
      },
      resizeOptions: [
        { name: "resizeImage:original", value: null, label: "Оригинал", icon: "original" },
        { name: "resizeImage:50", value: "50", label: "50%", icon: "medium" },
        { name: "resizeImage:75", value: "75", label: "75%", icon: "large" },
      ],
      insert: {
        type: "auto" as const,
      },
    },
    heading: {
      options: headingOptions,
    },
    alignment: {
      ...alignmentConfig,
    },
    placeholder: placeholder ?? "Введите содержимое новости...",
    licenseKey: "GPL",
  }), [placeholder])

  const createUploadAdapter = useCallback((loader: unknown) => {
    return {
      upload: async () => {
        const file = await (loader as { file?: Promise<File | null> }).file
        if (!file) {
          return { default: "" }
        }

        const { url } = await uploadFile(file)
        return { default: url }
      },
      abort: () => undefined,
    }
  }, [])

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    if (value !== lastSyncedValueRef.current) {
      editorRef.current.setData(value)
      lastSyncedValueRef.current = value
    }
  }, [value])

  return (
    <div className="min-h-[320px]">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={editorConfig}
        onReady={(editor) => {
          editorRef.current = editor
          const fileRepository = editor.plugins.get("FileRepository") as FileRepository | undefined
          if (fileRepository) {
            fileRepository.createUploadAdapter = (loader: unknown) => createUploadAdapter(loader)
          }
        }}
        onChange={(_, editor) => {
          const data = editor.getData()
          lastSyncedValueRef.current = data
          onChange(data)
        }}
      />
    </div>
  )
}