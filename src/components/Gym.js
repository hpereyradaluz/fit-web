import React, { useState, useEffect } from 'react'
import GymDataService from '../services/GymService'
import { Link } from 'react-router-dom'

const Gym = (props) => {
  const initialGymState = {
    id: null,
    name: '',
    latitude: '',
    longitude: '',
    kind: '',
  }
  const [currentGym, setCurrentGym] = useState(initialGymState)
  const [message, setMessage] = useState('')

  const getGym = (id) => {
    GymDataService.get(id)
      .then((response) => {
        console.log(response.data)
        var gym = {
          id: response.data._id,
          name: response.data.name,
          latitude: response.data.location.coordinates[1],
          longitude: response.data.location.coordinates[0],
          kind: response.data.kind.type,
        }
        setCurrentGym(gym)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getGym(props.match.params.id)
  }, [props.match.params.id])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCurrentGym({ ...currentGym, [name]: value })
  }

  const updateGym = () => {
    var gym = {
      name: currentGym.name,
      location: {
        type: 'Point',
        coordinates: [
          parseFloat(currentGym.longitude),
          parseFloat(currentGym.latitude),
        ],
      },
      kind: { type: currentGym.kind },
    }
    GymDataService.update(currentGym.id, gym)
      .then((response) => {
        setMessage('The gym was updated successfully!')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteGym = () => {
    GymDataService.remove(currentGym.id)
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
      {currentGym ? (
        <div className="container">
          <div class="abs-center">
            <h4>Gym</h4>
            <form>
              <div className="form-group col-md-9">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={currentGym.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-9">
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="number"
                  className="form-control"
                  id="latitude"
                  required
                  value={currentGym.latitude}
                  onChange={handleInputChange}
                  name="latitude"
                />
              </div>

              <div className="form-group col-md-9">
                <label htmlFor="longitude">Longitude</label>
                <input
                  type="number"
                  className="form-control"
                  id="longitude"
                  required
                  value={currentGym.longitude}
                  onChange={handleInputChange}
                  name="longitude"
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
                  value={currentGym.kind}
                  onChange={handleInputChange}
                  name="kind"
                >
                  <option selected>Choose...</option>
                  <option value="Normal">Normal</option>
                  <option value="Open">Open</option>
                </select>
              </div>
            </form>
            <div className="container">
              <div class="abs-center">
                <Link to={'/'} className="btn btn-outline-primary">
                  Back
                </Link>
                <button
                  type="submit"
                  className="btn btn-outline-warning"
                  onClick={updateGym}
                >
                  Update
                </button>

                <button className="btn btn-outline-danger" onClick={deleteGym}>
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
          <p>Please click on a Gym...</p>
        </div>
      )}
    </div>
  )
}

export default Gym
