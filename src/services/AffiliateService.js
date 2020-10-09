import http from '../http-common'

const getAll = () => {
  return http.get('/affiliate')
}

const get = (id) => {
  return http.get(`/affiliate/${id}`)
}

const create = (data) => {
  console.log(data)
  return http.post('/affiliate', data)
}

const update = (id, data) => {
  return http.put(`/affiliate/${id}`, data)
}

const remove = (id) => {
  return http.delete(`/affiliate/${id}`)
}

const findByName = (name) => {
  return http.get(`/affiliate?search=${name}`)
}

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
}
