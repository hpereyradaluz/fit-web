import React from 'react'
import AddGym from './components/AddGym'
import GymsList from './components/GymList'

function Gyms() {
  return (
    <div className="list row">
      <div className="col-md-3">
        <AddGym />
      </div>
      <div className="col-md-8">
        <GymsList />
      </div>
    </div>
  )
}

export default Gyms
