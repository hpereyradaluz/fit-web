import React, { useState, useEffect } from 'react'
import AffiliateDataService from '../services/AffiliateService'
import { Link } from 'react-router-dom'

const AffiliatesList = () => {
  const [affiliates, setAffiliates] = useState([])
  const [currentAffiliate, setCurrentAffiliate] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    retrieveAffiliates()
  }, [])

  const onChangeSearchName = (e) => {
    const searchName = e.target.value
    setSearchName(searchName)
  }

  const retrieveAffiliates = () => {
    AffiliateDataService.getAll()
      .then((response) => {
        setAffiliates(response.data)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const setActiveAffiliate = (affiliate, index) => {
    setCurrentAffiliate(affiliate)
    setCurrentIndex(index)
  }

  const findByName = () => {
    AffiliateDataService.findByName(searchName)
      .then((response) => {
        setAffiliates(response.data)
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
          {affiliates &&
            affiliates.map((affiliate, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveAffiliate(affiliate, index)}
                key={index}
              >
                {affiliate.name} {affiliate.lastname}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentAffiliate ? (
          <div>
            <h4>Affiliate Details</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{' '}
              {currentAffiliate.name}
            </div>
            <div>
              <label>
                <strong>LastName:</strong>
              </label>{' '}
              {currentAffiliate.lastname}
            </div>
            <div>
              <label>
                <strong>Plan:</strong>
              </label>{' '}
              {currentAffiliate.plan.type}
            </div>

            <Link
              to={'/affiliate/' + currentAffiliate._id}
              className="btn btn-outline-primary"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Affiliate...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AffiliatesList
