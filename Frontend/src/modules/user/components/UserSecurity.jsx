import React from 'react';
import { useAuth } from '@auth/context/AuthContext';
import Disable2FA from '@auth/components/2FA/Disable2FA';
import Enable2FA from '@auth/components/2FA/Enable2FA';
import SendVerifyEmail from '@user/components/mails/SendVerifyEmail';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, ShieldCheck, ShieldOff } from 'lucide-react';

const UserSecurity = () => {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      <section>
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold text-foreground">Email Verification</h2>
          <p className="text-sm text-muted-foreground">
            Make sure your email address is verified so we can reach you securely and provide important account updates.
          </p>
        </div>
        <div className="space-y-4">
          {user?.email_verified_at ? (
            <Alert variant="success" className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              <AlertTitle>Your email is verified</AlertTitle>
              <AlertDescription>
                You will receive important updates at <strong>{user.email}</strong>.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <Alert variant="destructive" className="flex items-center">
                <XCircle className="w-5 h-5 mr-2 text-red-600" />
                <AlertTitle>Email not verified</AlertTitle>
                <AlertDescription>
                  Please verify your email to ensure secure communication.
                </AlertDescription>
              </Alert>
              <SendVerifyEmail />
            </>
          )}
        </div>
      </section>

      <section>
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold text-foreground">Two-Factor Authentication (2FA)</h2>
          <p className="text-sm text-muted-foreground">
            Add an extra layer of protection to your account by enabling two-factor authentication.
          </p>
        </div>
        <div className="space-y-4">
          {user?.google2fa_enabled ? (
            <>
              <Alert variant="success" className="flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-green-600" />
                <AlertTitle>2FA is enabled</AlertTitle>
                <AlertDescription>
                  Your account is protected with two-factor authentication.
                </AlertDescription>
              </Alert>
              <Disable2FA />
            </>
          ) : (
            <>
              <Alert variant="destructive" className="flex items-center">
                <ShieldOff className="w-5 h-5 mr-2 text-red-600" />
                <AlertTitle>2FA is disabled</AlertTitle>
                <AlertDescription>
                  We strongly recommend enabling 2FA to enhance your account security.
                </AlertDescription>
              </Alert>
              <Enable2FA />
            </>
          )}
        </div>
      </section>

    </div>
  );
};

export default UserSecurity;
