

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import NotFoundPage from '@error/pages/NotFoundPage';
import HomePage from '@/future/HomePage';
import authRouter from '@auth/routes/router';
import userRouter from '@user/routes/router';


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },

            ...authRouter,
            ...userRouter,
        ]
    }
]);

export default router;