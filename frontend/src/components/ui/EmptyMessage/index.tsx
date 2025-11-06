import { cn } from '../../../utils/cn';

export interface EmptyMessageProps {
    message: string;
    variant?: 'empty' | 'error';
    className?: string;
}

export function EmptyMessage({
    message,
    variant = 'empty',
    className,
}: EmptyMessageProps) {
    const containerStyles =
        variant === 'error'
            ? 'bg-white rounded-lg shadow-sm border border-red-200'
            : 'bg-white rounded-lg shadow-sm border border-gray-200';

    const textStyles =
        variant === 'error'
            ? 'text-red-800'
            : 'text-gray-500';

    return (
        <div className={cn('min-h-[200px] flex justify-center items-center', containerStyles, className)}>
            <div className="px-4 py-6 sm:px-6 sm:py-8 text-center">
                <p className={textStyles}>{message}</p>
            </div>
        </div>
    );
}
