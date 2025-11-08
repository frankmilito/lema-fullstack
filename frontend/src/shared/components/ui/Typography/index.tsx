import type { ReactNode, HTMLAttributes, ElementType, LabelHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'error';

export interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, 'htmlFor'> {
    variant?: TypographyVariant;
    component?: ElementType;
    children: ReactNode;
    htmlFor?: LabelHTMLAttributes<HTMLLabelElement>['htmlFor'];
}

const variantStyles: Record<TypographyVariant, string> = {
    h1: 'text-2xl sm:text-3xl font-medium text-primary-100',
    h2: 'text-xl sm:text-2xl font-medium text-primary-100',
    h3: 'text-base sm:text-lg font-medium text-primary-100',
    body: 'text-xs sm:text-sm text-gray-700',
    label: 'text-sm sm:text-md font-medium text-primary-100',
    error: 'text-xs sm:text-sm text-red-500',
};

const defaultComponents: Record<TypographyVariant, ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    body: 'p',
    label: 'label',
    error: 'p',
};

export function Typography({
    variant = 'body',
    component,
    className,
    children,
    ...props
}: TypographyProps) {
    const Component = component || defaultComponents[variant];

    return (
        <Component
            className={cn(variantStyles[variant], className)}
            {...props}
        >
            {children}
        </Component>
    );
}

