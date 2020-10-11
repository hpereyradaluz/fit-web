import axios from 'axios'

export default axios.create({
  baseURL: 'http://secret-anchorage-07531.herokuapp.com/',
  headers: {
    'Content-type': 'application/json',
  },
})
