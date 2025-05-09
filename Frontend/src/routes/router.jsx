import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import NotFoundPage from '@error/pages/NotFoundPage';
import authRouter from '@auth/routes/router';
import userRouter from '@user/routes/router';
import accountRouter from '@account/routes/router';
import cardRouter from '@card/routes/router';
import DashboardRouter from '@dashboard/routes/router'
import transactionRouter from '@transaction/routes/router';
import LandingPage from '@/pages/LandingPage';


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },

            ...accountRouter,
            ...authRouter,
            ...cardRouter,
            ...DashboardRouter,
            ...transactionRouter,
            ...userRouter,
        ]
    }
]);

export default router;