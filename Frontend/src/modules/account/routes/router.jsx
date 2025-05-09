import ACCOUNT_ROUTES from './paths';
import AccountPage from '../pages/AccountPage';
import ProtectedRoutes from '@/routes/ProtectedRoutes';

const router = [

    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: ACCOUNT_ROUTES.ACCOUNT,
                element: <AccountPage />,
            },
        ]
    }

];

export default router;