import { useEffect } from 'react';
import { useGetUsers } from '../hooks/useUsers';
import { UsersTable } from '../components/users/UsersTable';
import { PageLayout } from '../components/layout/PageLayout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { User } from '../types/users';

const Users = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const pageSize = 4;
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    const initialPage = pageFromUrl > 0 ? pageFromUrl : 1;

    const {
        data: users = [],
        isLoading,
        isError,
        error,
        totalPages,
        totalCount
    } = useGetUsers(initialPage, pageSize);

    useEffect(() => {
        if (!isLoading && totalPages > 0) {
            if (initialPage > totalPages) {
                setSearchParams({ page: '1' }, { replace: true });
            } else if (initialPage !== pageFromUrl && pageFromUrl > 0) {
                setSearchParams({ page: initialPage.toString() }, { replace: true });
            }
        }
    }, [isLoading, totalPages, initialPage, pageFromUrl, setSearchParams]);

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: newPage.toString() }, { replace: true });
    };

    const handleRowClick = (user: User) => {
        navigate(`/users/posts/${user.user_id}`, {
            state: { name: user.name }
        });
    };

    return (
        <PageLayout>
            <div className="space-y-6 mx-auto max-w-[880px]">
                <h1 className="text-2xl sm:text-3xl font-medium text-primary-100">Users</h1>
                <UsersTable
                    users={users}
                    isLoading={isLoading}
                    error={isError ? (error as Error) : null}
                    currentPage={initialPage}
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