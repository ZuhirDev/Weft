import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from '@error/pages/NotFoundPage';
import authRouter from '@auth/routes/router';
import {publicUserRoutes, protectedUserRoutes } from '@user/routes/router';
import accountRouter from '@account/routes/router';
import cardRouter from '@card/routes/router';
import DashboardRouter from '@dashboard/routes/router'
import transactionRouter from '@transaction/routes/router';
import LandingPage from '@landing/pages/LandingPage';
import MAIN_ROUTES from './path';
import InvestmentPage from '@/modules/investment/pages/InvestmentPage';
import PublicLayout from '@/layouts/PublicLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';

const router = createBrowserRouter([

    {
        path: '/',
        element: <PublicLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },

            ...authRouter,
            ...publicUserRoutes,

        ]
    },
    
    {
        path: '',
        element: <ProtectedLayout />,
        errorElement: <NotFoundPage />,
        children: [
            ...accountRouter,
            ...cardRouter,
            ...DashboardRouter,
            ...transactionRouter,
            ...protectedUserRoutes,

            {
                path: MAIN_ROUTES.INVESTMENT,
                element: <InvestmentPage />
            }
        ]
    },

    {
        path: '*',
        element: <NotFoundPage />
    }
]);

export default router;