import { Table, type ColumnDefinition } from '../ui/Table';
import { Pagination } from '../ui/Pagination';
import type { User } from '../../types/users';

interface UsersTableProps {
    users: User[];
    isLoading?: boolean;
    error?: Error | null;
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

function formatAddress(): string {
    return '—';
}

export function UsersTable({
    users,
    isLoading = false,
    error = null,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
}: UsersTableProps) {
    const columns: ColumnDefinition<User>[] = [
        {
            id: 'name',
            header: 'Full name',
            accessor: 'name',
            headerClassName: 'font-semibold',
        },
        {
            id: 'email',
            header: 'Email address',
            accessor: 'email',
            cellRenderer: (value) => (
                <span className="text-gray-900">{String(value)}</span>
            ),
        },
        {
            id: 'address',
            header: 'Address',
            accessor: () => formatAddress(),
            cellRenderer: (value) => (
                <span className="text-gray-700">{String(value)}</span>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <Table
                data={users}
                columns={columns}
                isLoading={isLoading}
                error={error}
                emptyMessage="No users found"
                getRowKey={(user) => user.id}
            />

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}

