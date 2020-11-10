import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:5000/', //baseUrl for conenct to backed api
  headers: {
    'Content-type': 'application/json',
  },
})
