import AccountSelector from '@account/components/AccountSelector'
import React from 'react'
import NewCard from '@card/components/NewCard'
import Cards from '@card/components/Cards'

const CardLayout = () => {
  return (
    <div>
      <AccountSelector />
      <div className="max-w-5xl mx-auto px-4 py-8">        
        <Cards />

      </div>
    </div>
  )
}

export default CardLayout
