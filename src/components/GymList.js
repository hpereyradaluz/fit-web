import React, { useState, useEffect } from 'react'
import GymDataService from '../services/GymService'
import { Link } from 'react-router-dom'

const GymsList = () => {
  const [gyms, setGyms] = useState([])
  const [currentGym, setCurrentGym] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    retrieveGyms()
  }, [])

  const onChangeSearchName = (e) => {
    const searchName = e.target.value
    setSearchName(searchName)
  }

  const retrieveGyms = () => {
    GymDataService.getAll()
      .then((response) => {
        setGyms(response.data)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const setActiveGym = (gym, index) => {
    setCurrentGym(gym)
    setCurrentIndex(index)
  }

  const findByName = () => {
    GymDataService.findByName(searchName)
      .then((response) => {
        setGyms(response.data)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div className="list row">
      <div className="col-md-7">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <ul className="list-group">
          {gyms &&
            gyms.map((gym, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveGym(gym, index)}
                key={index}
              >
                {gym.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentGym ? (
          <div>
            <h4>Gym Details</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{' '}
              {currentGym.name}
            </div>
            <div>
              <label>
                <strong>Location:</strong>
              </label>{' '}
              {currentGym.location.coordinates['1']},{' '}
              {currentGym.location.coordinates['0']}
            </div>
            <div>
              <label>
                <strong>Kind:</strong>
              </label>{' '}
              {currentGym.kind.type}
            </div>

            <Link
              to={'/gym/' + currentGym._id}
              className="btn btn-outline-primary"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Gym...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GymsList
