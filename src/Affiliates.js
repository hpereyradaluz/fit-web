import React from 'react'
import AddAffiliate from './components/AddAffiliate'
import AffiliatesList from './components/AffiliateList'

function Affiliates() {
  return (
    <div className="list row">
      <div className="col-md-3">
        <AddAffiliate />
      </div>
      <div className="col-md-8">
        <AffiliatesList />
      </div>
    </div>
  )
}

export default Affiliates
