import { DataProvider, HttpError } from '@refinedev/core'
import { axiosInstance } from './rest-data-provider/utils'
import { BaseResponse } from './models/responses/baseResponse'

export const dataProvider = (url: string): DataProvider => ({
  getOne: async () => {
    const error: HttpError = {
      message: 'User is not authenticated',
      statusCode: 401,
    }
    return Promise.reject(error)
  },

  getList: async ({ resource, pagination, sorters }) => {
    const { current, pageSize } = pagination ?? {}
    const { data } = await axiosInstance.get<BaseResponse<any>>(
      `${url}/${resource}`,
      {
        params: {
          page: current,
          size: pageSize,
          sortName: sorters?.[0].field ?? 'id',
          sortDir: sorters?.[0].order ?? 'asc',
        },
      }
    )
    return data.data
  },
  create: async () => {
    throw new Error('Not implemented')
  },
  update: async () => {
    throw new Error('Not implemented')
  },
  deleteOne: async () => {
    throw new Error('Not implemented')
  },
  getApiUrl: () => url,
})
