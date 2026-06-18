import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/tasks/'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

export default {
  getTasks: () => instance.get(''),
  createTask: (data) => instance.post('', data),
  updateTask: (id, data) => instance.put(`${id}/`, data),
  deleteTask: (id) => instance.delete(`${id}/`)
}
