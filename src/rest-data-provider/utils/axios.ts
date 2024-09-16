import axios from 'axios'
import type { HttpError } from '@refinedev/core'
import { TOKEN_KEY } from '../../authProvider'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  config.responseType = 'json'
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    }

    return Promise.reject(customError)
  }
)

export { axiosInstance }
