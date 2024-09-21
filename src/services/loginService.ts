import { axiosInstance } from '@refinedev/simple-rest'
import { AuthRequest } from '../models/requests/authRequest'
import { AuthResponse } from '../models/responses/authResponse'
import { BaseResponse } from '../models/responses/baseResponse'

const auth = (
  url: string,
  request: AuthRequest
): Promise<BaseResponse<AuthResponse>> => {
  return axiosInstance
    .post<BaseResponse<AuthResponse>>(url, request)
    .then((q) => q.data)
}

export { auth }
