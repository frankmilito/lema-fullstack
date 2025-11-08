import { Table, type ColumnDefinition } from '@shared/components/ui/Table';
import { Pagination } from '@shared/components/ui';
import type { User } from '../types/user.types';

interface UserTableProps {
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

export function UserTable({
    users,
    isLoading = false,
    error = null,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
    onRowClick,
}: UserTableProps) {

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


