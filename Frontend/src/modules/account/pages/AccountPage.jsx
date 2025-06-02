import React from 'react';
import AccountLayout from '@account/layouts/AccountLayout';
import Deposit from '@/modules/transaction/components/Deposit';
import Withdrawal from '@/modules/transaction/components/Withdrawal';

const AccountPage = () => {
  return (
    <div>
      <h1>ACCOUNT PAGE</h1>
      <AccountLayout />
    </div>
  );
}

export default AccountPage;
