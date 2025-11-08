import { useEffect } from 'react';
import { useGetUsers } from '../api/queries';
import { UserTable } from '../components/UserTable';
import { PageLayout } from '@shared/components/layout/PageLayout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { User } from '../types/user.types';
import { Typography } from '@shared/components/ui';

export default function UsersPage() {
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
        navigate(`/users/posts/${user.user_id}?user=${encodeURIComponent(user.name)}&page=${initialPage}`);
    };

    return (
        <PageLayout>
            <div className="space-y-6 mx-auto max-w-[880px]">
                <Typography variant="h1">Users</Typography>
                <UserTable
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
}


