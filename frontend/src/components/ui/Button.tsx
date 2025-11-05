import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400',
    tertiary: 'bg-blue-600 text-white hover:bg-blue-300 disabled:bg-gray-100 disabled:text-gray-400',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 disabled:text-gray-400',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-2 py-1 text-xs sm:px-2.5 sm:py-1.5',
    md: 'px-2.5 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm',
    lg: 'px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base',
};

export function Button({
    variant = 'ghost',
    size = 'md',
    isLoading = false,
    disabled,
    className,
    children,
    ...props
}: ButtonProps) {
    const isDisabled = disabled || isLoading;

    return (
        <button
            {...props}
            disabled={isDisabled}
            className={cn(
                'font-medium rounded-md transition-colors focus:outline-none disabled:cursor-not-allowed',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
        >
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg
                        className="animate-spin h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    {children}
                </span>
            ) : (
                children
            )}
        </button>
    );
}

