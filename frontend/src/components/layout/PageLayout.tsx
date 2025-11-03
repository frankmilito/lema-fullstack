import type { ReactNode } from 'react';

interface PageLayoutProps {
    children: ReactNode;
}

/**
 * Simple page layout wrapper component
 */
export function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    );
}

