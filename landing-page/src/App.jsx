import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, adminRoutes, memberRoutes } from './routes';
import ProtectedRoute from './contexts/ProtectedRoute';
import ROUTES from './utils/routes';
import { Toaster } from 'react-hot-toast';

function App() {
    return (      
            <Router>
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                        success: {
                            duration: 3000,
                            style: {
                                background: '#4CAF50',
                            },
                        },
                        error: {
                            duration: 3000,
                            style: {
                                background: '#f44336',
                            },
                        },
                    }}
                />
                <Routes>
                    {/* Public Routes */}
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout || Fragment;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* Admin Routes */}
                    {adminRoutes.map((route, index) => {
                        const Layout = route.layout || Fragment;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <ProtectedRoute allowedRoles={['admin']}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ProtectedRoute>
                                }
                            />
                        );
                    })}

                    {/* Member Routes */}
                    {memberRoutes.map((route, index) => {
                        const Layout = route.layout || Fragment;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <ProtectedRoute allowedRoles={['customer']}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ProtectedRoute>
                                }
                            />
                        );
                    })}

                    {/*Redirect to login if not authenticated */}
                    <Route
                        path="*"
                        element={<Navigate to={ROUTES.LOGIN} replace />}
                    />
                </Routes>
            </Router>
    );
}

export default App;