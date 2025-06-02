import React from 'react'
import AccountCard from '@account/components/AccountCard'
import AccountCarousel from '../components/AccountCarousel'
import AccountDetails from '../components/AccountDetails'
import AccountAction from '../components/AccountAction'
import AccountCreditCard from '../components/AccountCreditCard'
import AccountRecentTrans from '../components/AccountRecentTrans'

const AccountLayout = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 pb-10 space-y-10">
       <AccountCarousel />

      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <AccountCard />
          </div>
          <div className="w-full lg:w-1/3 flex flex-col items-center gap-4">
            <AccountAction />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <AccountDetails />
          </div>
          <div className="w-full lg:w-1/3">
            <AccountCreditCard />
          </div>
        </div>

        <AccountRecentTrans />
      </div>
    </div>
  )
}

export default AccountLayout
