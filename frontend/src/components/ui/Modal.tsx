import { useEffect, type ReactNode } from 'react';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
    // Handle ESC key to close modal
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
        >
            <div
                className={`
                    bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto
                    ${className}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="px-6 pt-6 pb-4">
                        <h2 id="modal-title" className="text-2xl font-medium text-primary-100">
                            {title}
                        </h2>
                    </div>
                )}
                <div className={title ? 'px-6 py-6' : 'p-6'}>
                    {children}
                </div>
            </div>
        </div>
    );
}

