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
    onRowClick: (user: User) => void;
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
    onRowClick,
}: UsersTableProps) {

    const columns: ColumnDefinition<User>[] = [
        {
            id: 'name',
            header: 'Full name',
            accessor: 'name',
        },
        {
            id: 'email',
            header: 'Email address',
            accessor: 'email',
        },
        {
            id: 'address',
            header: 'Address',
            accessor: 'address',
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
                onRowClick={onRowClick}
            />

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                    isLoading={isLoading}
                    maxVisiblePages={5}
                />
            )}
        </div>
    );
}

