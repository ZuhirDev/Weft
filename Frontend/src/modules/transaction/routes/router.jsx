import ProtectedRoutes from '@/routes/ProtectedRoutes';
import TransactionPage from '../page/TransactionPage';
import TRANSACTION_ROUTES from './paths';

const router = [

    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: TRANSACTION_ROUTES.TRANSACTION,
                element: <TransactionPage />,
            },
        ]
    }
];

export default router;