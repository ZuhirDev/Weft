import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '@auth/context/AuthContext.jsx';
import { UserProvider } from '@user/context/UserContext.jsx';
import { LanguageProvider } from '@/context/LanguageContext.jsx';
import { AccountProvider } from '@account/context/AccountContext';
import { ThemeProvider } from '@/components/theme-provider';
import { CardProvider } from '@card/context/CardContext';
import { TransactionProvider } from '@transaction/context/TransactionContext';
import { VisibilityProvider } from '@/context/VisibilityContext';
import App from '@/App.jsx';
import '@/utils/i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
        <LanguageProvider>
          <AuthProvider>
            {/* <UserProvider >
              <VisibilityProvider >
                <TransactionProvider>
                  <CardProvider>
                    <AccountProvider >
                      <App />   
                    </AccountProvider>
                  </CardProvider>
                </TransactionProvider>
              </VisibilityProvider>
            </UserProvider> */}
            <App />
          </AuthProvider>
        </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
