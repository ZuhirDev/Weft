import ProtectedRoutes from '@/routes/ProtectedRoutes';
import DASHBOARD_ROUTES from '@dashboard/routes/paths';
import HomePage from '@dashboard/pages/HomePage';

const router = [

    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: DASHBOARD_ROUTES.DASHBOARD,
                element: <HomePage />,
            },
        ]
    }

];

export default router;