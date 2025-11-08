import deleteIcon from '@assets/delete-icon.svg';
import { cn } from '@shared/utils/cn';
import { Typography } from '@shared/components/ui';

export interface PostCardProps {
    title: string;
    content: string;
    onDelete?: () => void;
    className?: string;
    isDeleting?: boolean;
}

export function PostCard({ title, content, onDelete, className, isDeleting = false }: PostCardProps) {
    return (
        <div
            className={cn(
                'bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col w-[270px] min-h-[290px] overflow-hidden',
                className
            )}
        >
            <div className="w-full mb-4">
                {onDelete && (
                    <div className="flex justify-end items-end">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isDeleting) {
                                    onDelete();
                                }
                            }}
                            disabled={isDeleting}
                            aria-label="Delete post"
                            className="p-1 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={isDeleting ? "Deleting..." : "Delete post"}
                        >
                            <img src={deleteIcon} alt="Delete" className="w-3 h-3" />
                        </button>
                    </div>
                )}
                <Typography
                    variant="h3"
                    className="pr-2 flex-1 overflow-hidden"
                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                    {title}
                </Typography>
            </div>

            <Typography
                variant="body"
                className="overflow-hidden"
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 8,
                    WebkitBoxOrient: 'vertical',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                }}
            >
                {content}
            </Typography>
        </div>
    );
}


