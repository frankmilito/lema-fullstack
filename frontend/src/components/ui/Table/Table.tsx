import type { TableProps, ColumnDefinition } from './types';
import Spinner from '../Spinner';
import { EmptyMessage } from '../EmptyMessage';
import { cn } from '../../../utils/cn';

function renderCell<T extends Record<string, unknown>>(
    column: ColumnDefinition<T>,
    row: T
): React.ReactNode {
    const { accessor, cellRenderer } = column;

    let value: unknown;
    if (typeof accessor === 'function') {
        value = accessor(row);
    } else {
        value = row[accessor];
    }

    if (cellRenderer) {
        return cellRenderer(value, row);
    }

    if (value === null || value === undefined) {
        return <span className="text-gray-400">—</span>;
    }

    return String(value);
}

function renderHeader<T>(column: ColumnDefinition<T>): React.ReactNode {
    if (column.headerRenderer) {
        return column.headerRenderer(column);
    }
    return column.header;
}

export function Table<T extends Record<string, unknown>>({
    data,
    columns,
    isLoading = false,
    error = null,
    emptyMessage = 'No data available',
    className = '',
    getRowKey = (_, index) => index,
    onRowClick,
}: TableProps<T>) {

    if (isLoading) {
        return (
            <div className={cn('bg-white rounded-lg shadow-sm border border-gray-200', className)}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <div className="flex justify-center items-center h-full py-4 sm:py-6 md:py-8">
                            <Spinner />
                        </div>
                    </table>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <EmptyMessage
                message={`Error loading data: ${error.message}`}
                variant="error"
                className={className}
            />
        );
    }

    if (!isLoading && data.length === 0) {
        return (
            <EmptyMessage
                message={emptyMessage}
                variant="empty"
                className={className}
            />
        );
    }

    return (
        <div className={cn('bg-white rounded-lg border border-gray-200 overflow-hidden', className)}>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b border-gray-200">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    scope="col"
                                    style={column.width ? {
                                        width: typeof column.width === 'number' ? `${column.width}px` : column.width,
                                        maxWidth: typeof column.width === 'number' ? `${column.width}px` : column.width
                                    } : undefined}
                                    className={cn(
                                        'px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 text-xs sm:text-sm font-medium text-primary-200 tracking-wider',
                                        column.headerClassName
                                    )}
                                >
                                    {renderHeader(column)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={getRowKey(row, rowIndex)}
                                className={cn(
                                    'hover:bg-gray-50 transition-colors',
                                    onRowClick && 'cursor-pointer'
                                )}
                                onClick={() => onRowClick?.(row)}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.id}
                                        style={column.width ? {
                                            width: typeof column.width === 'number' ? `${column.width}px` : column.width,
                                            maxWidth: typeof column.width === 'number' ? `${column.width}px` : column.width,
                                            minWidth: typeof column.width === 'number' ? `${column.width}px` : column.width
                                        } : undefined}
                                        className={cn(
                                            'px-3 py-3 sm:px-4 sm:py-3.5 md:px-6 md:py-4 text-xs sm:text-sm text-primary-100',
                                            column.cellClassName
                                        )}
                                    >
                                        {column.width ? (
                                            <div className="truncate">
                                                {renderCell(column, row)}
                                            </div>
                                        ) : (
                                            <div className="whitespace-nowrap">
                                                {renderCell(column, row)}
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

