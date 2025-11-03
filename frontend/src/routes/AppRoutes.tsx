import React, { Suspense, type JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const UsersPage = React.lazy(() => import('../pages/Users'));

const AppRoutes = (): JSX.Element => {
    return (
        <Router>
            <Suspense fallback={<div className="flex justify-center">Loading...</div>}>
                <Routes>
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/" element={<Navigate to="/users" replace />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default AppRoutes