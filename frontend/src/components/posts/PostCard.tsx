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
                bg-white rounded-lg border border-gray-200 shadow-sm
                p-6 flex flex-col min-w-[280px]
                ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
                ${className}
            `}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            } : undefined}
        >
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 pr-2 flex-1">
                    {title}
                </h3>
                {onDelete && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="shrink-0 p-1 hover:bg-red-50 rounded transition-colors"
                        aria-label="Delete post"
                        type="button"
                    >
                        <img src={deleteIcon} alt="Delete" className="w-3 h-3" />
                    </button>
                )}
            </div>

            <p className="text-sm text-gray-700 overflow-hidden text-ellipsis" style={{
                display: '-webkit-box',
                WebkitLineClamp: 7,
                WebkitBoxOrient: 'vertical',
            }}>
                {content}
            </p>
        </div>
    );
}

