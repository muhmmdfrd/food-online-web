import { axiosInstance } from '@refinedev/simple-rest'
import { AuthRequest } from '../models/requests/authRequest'
import { AuthResponse } from '../models/responses/authResponse'
import { BaseResponse } from '../models/responses/baseResponse'
import { RefreshTokenRequest } from '../models/requests/refreshTokenRequest'
import { AuthRevokeResponse } from '../models/responses/authRevokeResponse'

const auth = (
  url: string,
  request: AuthRequest
): Promise<BaseResponse<AuthResponse>> => {
  return axiosInstance
    .post<BaseResponse<AuthResponse>>(url, request)
    .then((q) => q.data)
}

const refreshToken = (
  url: string,
  request: RefreshTokenRequest
): Promise<BaseResponse<AuthRevokeResponse>> => {
  return axiosInstance
    .post<BaseResponse<AuthRevokeResponse>>(url, request)
    .then((q) => q.data)
}

export { auth, refreshToken }
