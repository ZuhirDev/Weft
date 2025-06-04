import AccountSelector from '@account/components/AccountSelector'
import React from 'react'
import Cards from '@card/components/Cards'

const CardLayout = () => {
  return (
    <div className="max-w-[90vw] md:max-w-[60vw] mx-auto px-4 py-6">
      <AccountSelector />
      <div className='mt-10'>
        <Cards />
      </div>
    </div>
  )
}

export default CardLayout
