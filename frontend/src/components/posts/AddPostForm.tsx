import { useState, type FormEvent } from 'react';
import { Button } from '../ui/Button';

export interface AddPostFormProps {
    onSubmit: (data: { title: string; body: string }) => void | Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export function AddPostForm({ onSubmit, onCancel, isLoading = false }: AddPostFormProps) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) {
            return;
        }
        await onSubmit({ title: title.trim(), body: body.trim() });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="post-title" className="block text-sm font-medium text-primary-100 mb-2">
                    Post title
                </label>
                <input
                    id="post-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your post a title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                />
            </div>

            <div>
                <label htmlFor="post-body" className="block text-sm font-medium text-primary-100 mb-2">
                    Post content
                </label>
                <textarea
                    id="post-body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Write something mind-blowing"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                    disabled={isLoading}
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="tertiary"
                    isLoading={isLoading}
                    disabled={!title.trim() || !body.trim() || isLoading}
                >
                    Publish
                </Button>
            </div>
        </form>
    );
}

