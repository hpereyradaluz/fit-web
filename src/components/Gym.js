import React, { useState, useEffect } from 'react'
import GymDataService from '../services/GymService'
import { Link } from 'react-router-dom'

const Gym = (props) => {
  const initialGymState = {
    id: null,
    name: '',
    location: '',
    kind: '',
  }
  const [currentGym, setCurrentGym] = useState(initialGymState)
  const [message, setMessage] = useState('')

  const getGym = (id) => {
    GymDataService.get(id)
      .then((response) => {
        setCurrentGym(response.data)
        console.log(response.data)
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
    GymDataService.update(currentGym._id, currentGym)
      .then((response) => {
        console.log(response.data)
        setMessage('The gym was updated successfully!')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteGym = () => {
    GymDataService.remove(currentGym._id)
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
        <div className="edit-form">
          <h4>Gym</h4>
          <form>
            <div className="form-group">
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
          </form>

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

          <p>{message}</p>
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
