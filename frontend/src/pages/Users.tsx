import { useState } from 'react';
import { useGetUsers } from '../hooks/useUsers';
import { UsersTable } from '../components/users/UsersTable';
import { PageLayout } from '../components/layout/PageLayout';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/users';

const Users = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const pageSize = 4;
    const {
        data: users = [],
        isLoading,
        isError,
        error,
        totalPages,
        totalCount
    } = useGetUsers(page, pageSize);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleRowClick = (user: User) => {
        navigate(`/users/posts/${user.user_id}`, { state: { name: user.name } });
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
                    onRowClick={handleRowClick}
                />
            </div>
        </PageLayout>
    );
};

export default Users;