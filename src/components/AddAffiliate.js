import React, { useState } from 'react'
import AffiliateDataService from '../services/AffiliateService'

const AddAffiliate = () => {
  const initialAffiliateState = {
    id: null,
    name: '',
    lastname: '',
    plan: '',
  }
  const [affiliate, setAffiliate] = useState(initialAffiliateState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setAffiliate({ ...affiliate, [name]: value })
  }

  const saveAffiliate = () => {
    var data = {
      name: affiliate.name,
      lastname: affiliate.lastname,
      plan: { type: affiliate.plan },
    }

    AffiliateDataService.create(data)
      .then((response) => {
        setAffiliate({
          id: response.data.id,
          name: response.data.name,
          lastname: response.data.lastname,
          plan: response.data.plan,
        })
        setSubmitted(true)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const newAffiliate = () => {
    setAffiliate(initialAffiliateState)
    setSubmitted(false)
  }

  return (
    <div className="submit-form col-md-12">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-outline-success" onClick={newAffiliate}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group col-md-9">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={affiliate.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group col-md-9">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              required
              value={affiliate.lastname}
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
              value={affiliate.plan}
              onChange={handleInputChange}
              name="plan"
            >
              <option selected>Choose...</option>
              <option value="Basic">Basic</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          <div className="col-md-9">
            <button onClick={saveAffiliate} className="btn btn-outline-success">
              Add Affiliate
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddAffiliate
