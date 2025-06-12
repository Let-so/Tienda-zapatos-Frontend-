import axios from 'axios'

const api = axios.create({
  baseURL: '/api'      // ahora apunta a http://localhost:5173/api que Vite proxyea a 3001
})

export default api
