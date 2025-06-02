import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useAuth } from '@auth/context/AuthContext'
import Disable2FA from '@auth/components/2FA/Disable2FA'
import Enable2FA from '@auth/components/2FA/Enable2FA'
import SendVerifyEmail from '@user/components/mails/SendVerifyEmail'

const UserSecurity = () => {
  const { is2FAEnabled, emailVerified } = useAuth()

  return (
    <div className="space-y-8 max-w-3xl mx-auto">

      {/* Email verification */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription className="text-gray-600">
            Ensure your email address is verified so we can reach you securely and provide important account updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {emailVerified ? (
            <p className="text-green-600 font-medium">Your email is verified.</p>
          ) : (
            <>
              <p className="mb-4 text-red-600 font-medium">Your email is not verified.</p>
              <SendVerifyEmail />
            </>
          )}
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
          <CardDescription className="text-gray-600">
            Protect your account with an additional layer of security by enabling two-factor authentication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {is2FAEnabled ? (
            <section>
              <h3 className="text-lg font-semibold mb-4">2FA is currently <span className="text-green-600">enabled</span>.</h3>
              <Disable2FA />
            </section>
          ) : (
            <section>
              <h3 className="text-lg font-semibold mb-4">2FA is currently <span className="text-red-600">disabled</span>.</h3>
              <Enable2FA />
            </section>
          )}
        </CardContent>
      </Card>

    </div>
  )
}

export default UserSecurity
