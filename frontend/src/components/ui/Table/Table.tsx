import type { TableProps, ColumnDefinition } from './types';

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
    showLoadingSkeleton = true,
}: TableProps<T>) {

    const getAlignmentClass = (align?: 'left' | 'right' | 'center') => {
        switch (align) {
            case 'right':
                return 'text-right';
            case 'center':
                return 'text-center';
            case 'left':
            default:
                return 'text-left';
        }
    };

    if (isLoading && showLoadingSkeleton) {
        return (
            <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.id}
                                        className={`px-6 py-3 ${getAlignmentClass(column.align)} ${column.headerClassName || ''}`}
                                    >
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <tr key={index}>
                                    {columns.map((column) => (
                                        <td
                                            key={column.id}
                                            className={`px-6 py-4 ${getAlignmentClass(column.align)} ${column.cellClassName || ''}`}
                                        >
                                            <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
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

    if (error) {
        return (
            <div className={`bg-white rounded-lg shadow-sm border border-red-200 ${className}`}>
                <div className="px-6 py-8 text-center">
                    <p className="text-red-600">Error loading data: {error.message}</p>
                </div>
            </div>
        );
    }

    if (!isLoading && data.length === 0) {
        return (
            <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
                <div className="px-6 py-8 text-center">
                    <p className="text-gray-500">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    scope="col"
                                    className={`
                    px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider
                    ${getAlignmentClass(column.align)}
                    ${column.headerClassName || ''}
                  `}
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
                                className={`
                  hover:bg-gray-50 transition-colors
                  ${onRowClick ? 'cursor-pointer' : ''}
                `}
                                onClick={() => onRowClick?.(row)}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.id}
                                        className={`
                      px-6 py-4 whitespace-nowrap text-sm text-gray-900
                      ${getAlignmentClass(column.align)}
                      ${column.cellClassName || ''}
                    `}
                                    >
                                        {renderCell(column, row)}
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

