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
                p-6 min-w-[280px]
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

            <span className="text-sm font-medium text-primary-100">New Post</span>
        </div>
    );
}

