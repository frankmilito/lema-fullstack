import deleteIcon from '../../assets/delete-icon.svg';

export interface PostCardProps {
    title: string;
    content: string;
    onDelete?: () => void;
    onClick?: () => void;
    className?: string;
}

export function PostCard({ title, content, onDelete, onClick, className = '' }: PostCardProps) {
    return (
        <div
            className={`
                bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col min-w-[280px] ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
                ${className}
            `}
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
                                onDelete();
                            }}
                            className="p-1 hover:bg-red-50 rounded transition-colors"
                        >
                            <img src={deleteIcon} alt="Delete" className="w-3 h-3" />
                        </button>
                    </div>
                )}
                <h3 className="text-base sm:text-lg font-bold text-primary-100 pr-2 flex-1">
                    {title}
                </h3>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 overflow-hidden text-ellipsis" style={{
                display: '-webkit-box',
                WebkitLineClamp: 8,
                WebkitBoxOrient: 'vertical',
            }}>
                {content}
            </p>
        </div>
    );
}

