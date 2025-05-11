import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '@auth/context/AuthContext.jsx';
import { UserProvider } from '@user/context/UserContext.jsx';
import { LanguageProvider } from '@/context/LanguageContext.jsx';
import App from '@/App.jsx';
import '@/utils/i18n';
import { AccountProvider } from './modules/account/context/AccountContext';
import { LoadingProvider } from './context/LoadingContext';
import Loading from './components/Loading';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <LanguageProvider>
        <AuthProvider>
          <UserProvider >
            <AccountProvider>
              <App />   
              <Loading />
            </AccountProvider>
          </UserProvider>
        </AuthProvider>
      </LanguageProvider>
    </LoadingProvider>
  </StrictMode>,
);
