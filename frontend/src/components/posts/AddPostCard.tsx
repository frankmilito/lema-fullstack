import addCircleIcon from '../../assets/add_circle.svg';

export interface AddPostCardProps {
    onClick: () => void;
    className?: string;
}

export function AddPostCard({ onClick, className = '' }: AddPostCardProps) {
    return (
        <div
            className={`
                bg-white rounded-lg border-2 border-dashed border-gray-300
                aspect-square flex flex-col items-center justify-center
                cursor-pointer transition-colors
                hover:border-gray-400
                p-6
                ${className}
            `}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label="Create new post"
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            data-testid="create new post"
        >
            <div className="mb-3">
                <img src={addCircleIcon} alt="Add circle" className="w-10 h-10" />
            </div>

            {/* Text */}
            <span className="text-sm font-medium text-gray-900">New Post</span>
        </div>
    );
}

