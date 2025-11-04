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

function formatAddress(user: User): string {
    const parts: string[] = [];
    if (user.street) parts.push(user.street);
    if (user.city) parts.push(user.city);
    if (user.state) parts.push(user.state);
    if (user.zipcode) parts.push(user.zipcode);

    return parts.length > 0 ? parts.join(', ') : '—';
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
        },
        {
            id: 'address',
            header: 'Address',
            accessor: (user) => formatAddress(user),
            width: 392,

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

