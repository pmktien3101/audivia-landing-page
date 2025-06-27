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
        position="top-center"
        gutter={8}
        containerStyle={{ top: '80px' }}
        reverseOrder={false}
        toastOptions={{
          style: {
            background: 'linear-gradient(135deg, #00A5CF, #d6a4ff)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
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