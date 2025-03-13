import axios from 'axios'

const API_BASE_URL = 'http://localhost:5001'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const setApiBaseUrl = (newBaseUrl) => {
  apiClient.defaults.baseURL = newBaseUrl
}

export default apiClient
