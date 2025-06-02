
import AUTH_ROUTES from '@auth/routes/paths';
import LoginPage from '@auth/pages/LoginPage';
import RegisterPage from '@auth/pages/RegisterPage';
import RegisterPages from '../pages/RegisterPages';

const router = [

    {
    path: AUTH_ROUTES.REGISTER,
    element: <RegisterPages />,
    },

    {
    path: AUTH_ROUTES.LOGIN,
    element: <LoginPage />,
    },
];

export default router;