import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui';
import { postFormSchema, type PostFormData } from '../../schemas/post';
import { cn } from '../../utils/cn';

export interface AddPostFormProps {
    onSubmit: (data: { title: string; body: string }) => void | Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
    initialTitle?: string;
    initialBody?: string;
}

export function AddPostForm({
    onSubmit,
    onCancel,
    isLoading = false,
    initialTitle = '',
    initialBody = ''
}: AddPostFormProps) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PostFormData>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            title: initialTitle,
            body: initialBody,
        },
    });

    const onSubmitForm = async (data: PostFormData) => {
        await onSubmit(data);
        if (!initialTitle && !initialBody) {
            reset();
        }
    };

    const isFormLoading = isLoading || isSubmitting;

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <div>
                <label htmlFor="post-title" className="block text-sm sm:text-md font-medium text-primary-100 mb-2">
                    Post title
                </label>
                <input
                    id="post-title"
                    type="text"
                    {...register('title')}
                    placeholder="Give your post a title"
                    maxLength={200}
                    className={cn(
                        'w-full px-4 py-2 border placeholder:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                        errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    )}
                    disabled={isFormLoading}
                    aria-describedby={errors.title ? 'title-error' : undefined}
                />
                {errors.title && (
                    <p id="title-error" className="mt-1 text-xs sm:text-sm text-red-500" role="alert">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="post-body" className="block text-sm sm:text-md font-medium text-primary-100 mb-2">
                    Post content
                </label>
                <textarea
                    id="post-body"
                    {...register('body')}
                    placeholder="Write something mind-blowing"
                    rows={5}
                    maxLength={5000}
                    className={cn(
                        'w-full px-4 placeholder:text-sm py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y',
                        errors.body ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    )}
                    disabled={isFormLoading}
                />
                {errors.body && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500" role="alert">
                        {errors.body.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isFormLoading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="tertiary"
                    isLoading={isFormLoading}
                    disabled={isFormLoading}
                >
                    {initialTitle ? 'Update' : 'Publish'}
                </Button>
            </div>
        </form>
    );
}

