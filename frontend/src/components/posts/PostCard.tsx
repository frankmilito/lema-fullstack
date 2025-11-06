import { memo } from 'react';
import deleteIcon from '../../assets/delete-icon.svg';
import { cn } from '../../utils/cn';

export interface PostCardProps {
    title: string;
    content: string;
    onDelete?: () => void;
    onClick?: () => void;
    className?: string;
    isDeleting?: boolean;
}

export function PostCard({ title, content, onDelete, onClick, className, isDeleting = false }: PostCardProps) {
    return (
        <div
            className={cn(
                'bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col w-[270px] min-h-[290px] overflow-hidden',
                onClick && 'cursor-pointer hover:shadow-md transition-shadow',
                className
            )}
            onClick={onClick}
            onKeyDown={onClick ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            } : undefined}
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
                <h3
                    className="text-base sm:text-lg font-bold text-primary-100 pr-2 flex-1 overflow-hidden"
                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                    {title}
                </h3>
            </div>

            <p
                className="text-xs sm:text-sm text-gray-700 overflow-hidden"
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 8,
                    WebkitBoxOrient: 'vertical',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                }}
            >
                {content}
            </p>
        </div>
    );
}

export const MemoizedPostCard = memo(PostCard);

