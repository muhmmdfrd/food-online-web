import axios from 'axios'
import { useLogout, type HttpError } from '@refinedev/core'
import {
  CURRENT_USER_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_KEY,
} from '../../authProvider'
import { constants } from '../../constants'
import { UserResponse } from '../../models/responses/userResponse'
import { refreshToken } from '../../services/loginService'
import { RefreshTokenRequest } from '../../models/requests/refreshTokenRequest'

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
  async (error) => {
    if (error.response?.data?.code == constants.code.Unauthorized) {
      try {
        const refreshTokenString = localStorage.getItem(REFRESH_TOKEN_KEY)
        const currentUser = JSON.parse(
          localStorage.getItem(CURRENT_USER_KEY) ?? ''
        ) as UserResponse

        const request: RefreshTokenRequest = {
          code: refreshTokenString ?? '',
          userId: currentUser.id,
        }

        const response = await refreshToken(
          constants.url + '/auth/revoke',
          request
        )

        localStorage.setItem(TOKEN_KEY, response.data?.token ?? '')
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data?.code ?? '')

        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data?.token}`
        error.config.headers['Authorization'] = `Bearer ${response.data?.token}`
        return axiosInstance(error.config)
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        useLogout()
      }
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
