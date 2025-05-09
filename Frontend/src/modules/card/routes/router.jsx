import CARD_ROUTES from './paths';
import CardPage from '../page/CardPage';
import ProtectedRoutes from '@/routes/ProtectedRoutes';

const router = [

    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: CARD_ROUTES.CARD,
                element: <CardPage />,
            },
        ]
    }
];

export default router;