import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '@auth/context/AuthContext.jsx';
import { UserProvider } from '@user/context/UserContext.jsx';
import { LanguageProvider } from '@/context/LanguageContext.jsx';
import App from '@/App.jsx';
import '@/utils/i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <UserProvider >
          <App />   
        </UserProvider>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>,
);
