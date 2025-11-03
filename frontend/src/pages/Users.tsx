import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { UsersTable } from '../components/users/UsersTable';
import { PageLayout } from '../components/layout/PageLayout';

const Users = () => {
    const [page, setPage] = useState(1);
    const pageSize = 4;
    const {
        data: users = [],
        isLoading,
        isError,
        error,
        totalPages,
        totalCount
    } = useUsers(page, pageSize);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <PageLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Users</h1>
                <UsersTable
                    users={users}
                    isLoading={isLoading}
                    error={isError ? (error as Error) : null}
                    currentPage={page}
                    totalPages={totalPages}
                    totalItems={totalCount}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
            </div>
        </PageLayout>
    );
};

export default Users;