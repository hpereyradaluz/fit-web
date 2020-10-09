import http from '../http-common'

const getAll = () => {
  return http.get('/gym')
}

const get = (id) => {
  return http.get(`/gym/${id}`)
}

const create = (data) => {
  console.log(data)
  return http.post('/gym', data)
}

const update = (id, data) => {
  return http.put(`/gym/${id}`, data)
}

const remove = (id) => {
  return http.delete(`/gym/${id}`)
}

const findByName = (name) => {
  return http.get(`/gym?search=${name}`)
}

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
}
