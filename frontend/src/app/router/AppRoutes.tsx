import React, { Suspense, type JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from '@shared/components/ui';

const UsersPage = React.lazy(() => import('@features/users/pages/UsersPage'));
const UserPostPage = React.lazy(() => import('@features/posts/pages/UserPostsPage'));

export const AppRoutes = (): JSX.Element => {
    return (
        <Router>
            <Suspense fallback={<Spinner />}>
                <Routes>
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/users/posts/:id" element={<UserPostPage />} />
                    <Route path="/" element={<Navigate to="/users" replace />} />
                </Routes>
            </Suspense>
        </Router>
    )
}


