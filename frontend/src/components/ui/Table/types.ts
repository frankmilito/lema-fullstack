import type { ReactNode } from 'react';

export interface ColumnDefinition<T> {
    id: string;
    header: string;
    accessor: keyof T | ((row: T) => ReactNode);
    headerRenderer?: (column: ColumnDefinition<T>) => ReactNode;
    cellRenderer?: (value: unknown, row: T) => ReactNode;
    headerClassName?: string;
    cellClassName?: string;
    align?: 'left' | 'right' | 'center';
}

export interface TableProps<T extends Record<string, unknown>> {
    data: T[];
    columns: ColumnDefinition<T>[];
    isLoading?: boolean;
    error?: Error | null;
    emptyMessage?: string;
    className?: string;
    getRowKey?: (row: T, index: number) => string | number;
    onRowClick?: (row: T) => void;
    showLoadingSkeleton?: boolean;
}

export interface PaginationConfig {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
    maxVisiblePages?: number;
}

