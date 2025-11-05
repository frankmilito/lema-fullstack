import { useEffect, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
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
            className={cn(
                'fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4',
                'bg-black/50 backdrop-blur-sm',
                'transition-opacity duration-300 ease-out opacity-100'
            )}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
        >
            <div
                className={cn(
                    'bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto',
                    'transition-all duration-300 ease-out',
                    'animate-[modalEnter_0.3s_ease-out]',
                    className
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
                        <h2 id="modal-title" className="text-xl sm:text-2xl font-medium text-primary-100">
                            {title}
                        </h2>
                    </div>
                )}
                <div className={title ? 'px-4 py-4 sm:px-6 sm:py-6' : 'p-4 sm:p-6'}>
                    {children}
                </div>
            </div>
        </div>
    );
}

