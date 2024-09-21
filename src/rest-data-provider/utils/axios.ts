import axios from 'axios'
import { useLogout, type HttpError } from '@refinedev/core'
import { TOKEN_KEY } from '../../authProvider'
import { constants } from '../../constants'

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
  (response) => response,
  (error) => {
    if (error.response?.data?.code === constants.code.Unauthorized) {
      useLogout()
      return
    }

    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.data?.code,
    }

    return Promise.reject(customError)
  }
)

export { axiosInstance }
