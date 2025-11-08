import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '../ui';
import { postFormSchema, type PostFormData } from '../../schemas/post';
import { cn } from '../../utils/cn';

export interface AddPostFormProps {
    onSubmit: (data: { title: string; body: string }) => void | Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export function AddPostForm({
    onSubmit,
    onCancel,
    isLoading = false,
}: AddPostFormProps) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PostFormData>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            title: '',
            body: '',
        },
    });

    const onSubmitForm = async (data: PostFormData) => {
        await onSubmit(data);
    };

    const isFormLoading = isLoading || isSubmitting;

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <div>
                <Typography variant="label" component="label" htmlFor="post-title" className="block mb-2">
                    Post title
                </Typography>
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
                    <Typography variant="error" id="title-error" className="mt-1" role="alert">
                        {errors.title.message}
                    </Typography>
                )}
            </div>

            <div>
                <Typography variant="label" component="label" htmlFor="post-body" className="block mb-2">
                    Post content
                </Typography>
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
                    <Typography variant="error" className="mt-1" role="alert">
                        {errors.body.message}
                    </Typography>
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
                    Publish
                </Button>
            </div>
        </form>
    );
}

