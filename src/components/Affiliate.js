import React, { useState, useEffect } from 'react'
import AffiliateDataService from '../services/AffiliateService'
import { Link } from 'react-router-dom'

const Affiliate = (props) => {
  const initialAffiliateState = {
    id: null,
    name: '',
    lastname: '',
    plan: '',
  }
  const [currentAffiliate, setCurrentAffiliate] = useState(
    initialAffiliateState
  )
  const [message, setMessage] = useState('')

  const getAffiliate = (id) => {
    AffiliateDataService.get(id)
      .then((response) => {
        setCurrentAffiliate(response.data)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getAffiliate(props.match.params.id)
  }, [props.match.params.id])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCurrentAffiliate({ ...currentAffiliate, [name]: value })
  }

  const updateAffiliate = () => {
    AffiliateDataService.update(currentAffiliate._id, currentAffiliate)
      .then((response) => {
        console.log(response.data)
        setMessage('The affiliate was updated successfully!')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteAffiliate = () => {
    AffiliateDataService.remove(currentAffiliate._id)
      .then((response) => {
        console.log(response.data)
        props.history.push('/')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div>
      {currentAffiliate ? (
        <div className="container">
          <div class="abs-center">
            <h4>Affiliate</h4>
            <form>
              <div className="form-group col-md-9">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={currentAffiliate.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-9">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  required
                  value={currentAffiliate.lastname}
                  onChange={handleInputChange}
                  name="lastname"
                />
              </div>

              <div className="form-group col-md-9">
                <label htmlFor="kind">Plan</label>
                <select
                  class="custom-select mr-sm-2"
                  type="text"
                  className="form-control"
                  id="plan"
                  required
                  value={currentAffiliate.plan.type}
                  onChange={handleInputChange}
                  name="plan"
                >
                  <option selected>Choose...</option>
                  <option value="Basic">Basic</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
            </form>
            <div className="container">
              <div class="abs-center">
                <Link to={'/affiliates'} className="btn btn-outline-primary">
                  Back
                </Link>

                <button
                  type="submit"
                  className="btn btn-outline-warning"
                  onClick={updateAffiliate}
                >
                  Update
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={deleteAffiliate}
                >
                  Delete
                </button>
              </div>
            </div>
            <p>{message}</p>
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Affiliate...</p>
        </div>
      )}
    </div>
  )
}

export default Affiliate
