import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {
    Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
    Image as ImageIcon, Link as LinkIcon, AlignLeft, AlignCenter,
    AlignRight, Heading1, Heading2, Quote, Undo, Redo
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    onImageUpload?: (file: File) => Promise<string>;
}

const MenuButton = ({
    onClick,
    isActive = false,
    children,
    title
}: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
}) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className={`p-2 rounded-lg transition-colors ${isActive
                ? 'bg-organic-cyan/20 text-organic-cyan'
                : 'text-organic-white/60 hover:bg-white/5 hover:text-organic-white'
            }`}
    >
        {children}
    </button>
);

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, onImageUpload }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: 'Comece a escrever seu post...',
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] px-6 py-4 font-sans text-organic-white/80',
            },
        },
    });

    const addImage = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
            if (input.files?.length && onImageUpload) {
                const file = input.files[0];
                try {
                    const url = await onImageUpload(file);
                    editor?.chain().focus().setImage({ src: url }).run();
                } catch (error) {
                    console.error('Failed to upload image:', error);
                }
            }
        };
        input.click();
    }, [editor, onImageUpload]);

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;
        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="border border-white/10 rounded-3xl overflow-hidden bg-organic-gray/20">
            <div className="bg-white/5 border-b border-white/10 p-2 flex flex-wrap gap-1">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Negrito"
                >
                    <Bold size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Itálico"
                >
                    <Italic size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive('underline')}
                    title="Sublinhado"
                >
                    <UnderlineIcon size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-white/10 mx-1 self-center" />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 1 })}
                    title="Título 1"
                >
                    <Heading1 size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    title="Título 2"
                >
                    <Heading2 size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    title="Citação"
                >
                    <Quote size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-white/10 mx-1 self-center" />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Lista"
                >
                    <List size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Lista Numerada"
                >
                    <ListOrdered size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-white/10 mx-1 self-center" />

                <MenuButton
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    isActive={editor.isActive({ textAlign: 'left' })}
                    title="Alinhar à Esquerda"
                >
                    <AlignLeft size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    isActive={editor.isActive({ textAlign: 'center' })}
                    title="Centralizar"
                >
                    <AlignCenter size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    isActive={editor.isActive({ textAlign: 'right' })}
                    title="Alinhar à Direita"
                >
                    <AlignRight size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-white/10 mx-1 self-center" />

                <MenuButton onClick={setLink} isActive={editor.isActive('link')} title="Inserir Link">
                    <LinkIcon size={18} />
                </MenuButton>
                <MenuButton onClick={addImage} title="Inserir Imagem">
                    <ImageIcon size={18} />
                </MenuButton>

                <div className="ml-auto flex gap-1">
                    <MenuButton onClick={() => editor.chain().focus().undo().run()} title="Desfazer">
                        <Undo size={18} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().redo().run()} title="Refazer">
                        <Redo size={18} />
                    </MenuButton>
                </div>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
};
