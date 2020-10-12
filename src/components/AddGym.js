import React, { useState } from 'react'
import GymDataService from '../services/GymService'

const AddGym = () => {
  const initialGymState = {
    id: null,
    name: '',
    location: '',
    kind: '',
  }
  const [gym, setGym] = useState(initialGymState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setGym({ ...gym, [name]: value })
  }

  const saveGym = () => {
    var data = {
      name: gym.name,
      location: {
        type: 'Point',
        coordinates: [parseFloat(gym.longitud), parseFloat(gym.latitud)],
      },
      kind: { type: gym.kind },
    }

    GymDataService.create(data)
      .then((response) => {
        setGym({
          id: response.data.id,
          name: response.data.name,
          location: response.data.location,
          kind: response.data.kind,
        })
        setSubmitted(true)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const newGym = () => {
    setGym(initialGymState)
    setSubmitted(false)
  }

  return (
    <div className="submit-form col-md-12">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-outline-success" onClick={newGym}>
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
              value={gym.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group col-md-9">
            <label htmlFor="latitud">Latitude</label>
            <input
              type="number"
              className="form-control"
              id="latitud"
              required
              value={gym.latitud}
              onChange={handleInputChange}
              name="latitud"
            />
          </div>

          <div className="form-group col-md-9">
            <label htmlFor="longitud">Longitude</label>
            <input
              type="number"
              className="form-control"
              id="longitud"
              required
              value={gym.longitud}
              onChange={handleInputChange}
              name="longitud"
            />
          </div>

          <div className="form-group col-md-9">
            <label htmlFor="kind">Kind</label>
            <select
              class="custom-select mr-sm-2"
              type="text"
              className="form-control"
              id="kind"
              required
              value={gym.kind}
              onChange={handleInputChange}
              name="kind"
            >
              <option selected>Choose...</option>
              <option value="Normal">Normal</option>
              <option value="Open">Open</option>
            </select>
          </div>
          <div className="col-md-9">
            <button onClick={saveGym} className="btn btn-outline-success">
              Add Gym
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddGym
