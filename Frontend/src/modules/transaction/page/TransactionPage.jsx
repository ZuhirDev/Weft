import React from 'react'
import TransactionTable from '@transaction/components/TransactionTable';

const TransactionPage = () => {
  return (
    <div>
      <div className="w-[80%] mx-auto mt-10">
        <TransactionTable />
      </div>
    </div>
  )
}

export default TransactionPage
