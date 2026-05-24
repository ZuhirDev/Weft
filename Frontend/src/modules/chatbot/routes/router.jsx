import ProtectedRoutes from '@/routes/ProtectedRoutes';
import CHATBOT_ROUTES from '@chatbot/routes/paths';
import UploadDocumentPage from '@chatbot/pages/UploadDocumentPage';

const router = [
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: CHATBOT_ROUTES.UPLOAD_DOCUMENTS,
                element: <UploadDocumentPage />,
            },
        ]
    }
];

export default router;
