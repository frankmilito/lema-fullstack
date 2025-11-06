import React, { Suspense, type JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from '../components/ui';

const UsersPage = React.lazy(() => import('../pages/Users'));
const UserPostPage = React.lazy(() => import('../pages/UsersPost'));
const AppRoutes = (): JSX.Element => {
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

export default AppRoutes