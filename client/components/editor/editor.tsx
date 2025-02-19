"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import {
    ClassicEditor,
    Alignment,
    Autoformat,
    AutoImage,
    Autosave,
    BlockQuote,
    Bold,
    Bookmark,
    Code,
    Emoji,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    Markdown,
    MediaEmbed,
    Mention,
    FullPage,
    PageBreak,
    Paragraph,
    PasteFromMarkdownExperimental,
    PasteFromOffice,
    RemoveFormat,
    ShowBlocks,
    SimpleUploadAdapter,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline,
    WordCount,
} from "ckeditor5"

import "ckeditor5/ckeditor5.css"

const LICENSE_KEY =
    "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDEyMTkxOTksImp0aSI6IjRmZmU2NTJhLTRiNDItNDkyMC04NTM2LTMzYTMyN2ZmNzM5NyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjNhNzdiYTdjIn0.J9qsNFF44Z3EAh3jpF7Q2fPj8vq5a3D-i4KDIi4ohUYllx6vAggO2qq013DtU50gMA4w0wggvp523-DMeaEDKQ"
// "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDEyMTkxOTksImp0aSI6IjRmZmU2NTJhLTRiNDItNDkyMC04NTM2LTMzYTMyN2ZmNzM5NyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjNhNzdiYTdjIn0.J9qsNFF44Z3EAh3jpF7Q2fPj8vq5a3D-i4KDIi4ohUYllx6vAggO2qq013DtU50gMA4w0wggvp523-DMeaEDKQ"
interface EditorProps {
    onChange?: (data: string) => void;
    data?: string;
}
export default function RichTextEditor({ onChange, data = "" }: EditorProps) {
    const editorContainerRef = useRef<HTMLDivElement>(null)
    const editorRef = useRef<HTMLDivElement>(null)
    const editorWordCountRef = useRef<HTMLDivElement>(null)
    const editorMenuBarRef = useRef<HTMLDivElement>(null)
    const [isLayoutReady, setIsLayoutReady] = useState(false)

    useEffect(() => {
        setIsLayoutReady(true)
        return () => setIsLayoutReady(false)
    }, [])

    const editorConfig = useMemo(() => {
        if (!isLayoutReady) {
            return null
        }

        return {
            plugins: [
                Alignment,
                Autoformat,
                AutoImage,
                Autosave,
                BlockQuote,
                Bold,
                Bookmark,
                FullPage,
                Code,
                Emoji,
                Essentials,
                FindAndReplace,
                FontBackgroundColor,
                FontColor,
                FontFamily,
                FontSize,
                GeneralHtmlSupport,
                Heading,
                Highlight,
                HorizontalLine,
                ImageBlock,
                ImageCaption,
                ImageInline,
                ImageInsert,
                ImageInsertViaUrl,
                ImageResize,
                ImageStyle,
                ImageTextAlternative,
                ImageToolbar,
                ImageUpload,
                Indent,
                IndentBlock,
                Italic,
                Link,
                LinkImage,
                List,
                ListProperties,
                Markdown,
                MediaEmbed,
                Mention,
                PageBreak,
                Paragraph,
                PasteFromMarkdownExperimental,
                PasteFromOffice,
                RemoveFormat,
                ShowBlocks,
                SimpleUploadAdapter,
                SourceEditing,
                SpecialCharacters,
                SpecialCharactersArrows,
                SpecialCharactersCurrency,
                SpecialCharactersEssentials,
                SpecialCharactersLatin,
                SpecialCharactersMathematical,
                SpecialCharactersText,
                Strikethrough,
                Subscript,
                Superscript,
                Table,
                TableCaption,
                TableCellProperties,
                TableColumnResize,
                TableProperties,
                TableToolbar,
                TextTransformation,
                TodoList,
                Underline,
                WordCount,
            ],
            toolbar: {
                items: [
                    "sourceEditing",
                    "showBlocks",
                    "findAndReplace",
                    "|",
                    "heading",
                    "|",
                    "fontSize",
                    "fontFamily",
                    "fontColor",
                    "fontBackgroundColor",
                    "|",
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "subscript",
                    "superscript",
                    "code",
                    "removeFormat",
                    "|",
                    "emoji",
                    "specialCharacters",
                    "horizontalLine",
                    "pageBreak",
                    "link",
                    "bookmark",
                    "insertImage",
                    "insertImageViaUrl",
                    "mediaEmbed",
                    "insertTable",
                    "highlight",
                    "blockQuote",
                    "|",
                    "alignment",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "todoList",
                    "outdent",
                    "indent",
                ],
                shouldNotGroupWhenFull: true,
            },
            fontFamily: {
                supportAllValues: true,
            },
            fontSize: {
                options: [10, 12, 14, "default", 18, 20, 22],
                supportAllValues: true,
            },
            heading: {
                options: [
                    { model: "paragraph" as const, view: "p", title: "Paragraph", class: "ck-heading_paragraph" },
                    { model: "heading1" as const, view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
                    { model: "heading2" as const, view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
                    { model: "heading3" as const, view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
                ],
            },
            htmlSupport: {
                allow: [
                    {
                        name: /^.*$/,
                        styles: true,
                        attributes: true,
                        classes: true,
                    },
                ],
            },
            image: {
                toolbar: [
                    "toggleImageCaption",
                    "imageTextAlternative",
                    "|",
                    "imageStyle:inline",
                    "imageStyle:wrapText",
                    "imageStyle:breakText",
                    "|",
                    "resizeImage",
                ],
            },
            initialData: '',
            licenseKey: LICENSE_KEY,
            link: {
                addTargetToExternalLinks: true,
                defaultProtocol: "https://",
                decorators: {
                    toggleDownloadable: {
                        mode: "manual",
                        label: "Downloadable",
                        attributes: {
                            download: "file",
                        },
                    },
                },
            },
            list: {
                properties: {
                    styles: true,
                    startIndex: true,
                    reversed: true,
                },
            },
            mention: {
                feeds: [
                    {
                        marker: "@",
                        feed: [
                        ],
                    },
                ],
            },
            table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableProperties", "tableCellProperties"],
            },
            placeholder: "Type or paste your content here!",
        }
    }, [isLayoutReady])

    return (
        <div className="font-lato w-full mx-auto">
            <div className="border rounded-md shadow-sm p-4 bg-white" ref={editorContainerRef}>
                <div className="min-w-full max-w-full min-h-64">
                    <div ref={editorRef}>
                        {editorConfig && (
                            <CKEditor
                                onChange={(_, editor) => {
                                    const data = editor.getData();
                                    if (onChange) onChange(data);
                                }}
                                data={data}
                                onReady={(editor) => {
                                    const wordCount = editor.plugins.get("WordCount")
                                    if (editorWordCountRef.current && wordCount?.wordCountContainer) {
                                        editorWordCountRef.current.appendChild(wordCount.wordCountContainer)
                                    }

                                    if (editorMenuBarRef.current && editor.ui.view.menuBarView?.element) {
                                        editorMenuBarRef.current.appendChild(editor.ui.view.menuBarView.element)
                                    }

                                }}
                                onAfterDestroy={() => {
                                    if (editorWordCountRef.current) {
                                        Array.from(editorWordCountRef.current.children).forEach((child) => child.remove())
                                    }

                                    if (editorMenuBarRef.current) {
                                        Array.from(editorMenuBarRef.current.children).forEach((child) => child.remove())
                                    }
                                }}
                                editor={ClassicEditor}
                                config={editorConfig}
                            />
                        )}
                    </div>
                </div>
                <div className="flex justify-end text-gray-500 text-sm p-2" ref={editorWordCountRef} />
            </div>
        </div>
    )
}

