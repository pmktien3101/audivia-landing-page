import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, adminRoutes, memberRoutes } from './routes';
import ProtectedRoute from './contexts/ProtectedRoute';

function App() {
    return (
            <Router>
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
                </Routes>
            </Router>
    );
}

export default App;