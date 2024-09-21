import { DataProvider } from '@refinedev/core'
import { axiosInstance } from './rest-data-provider/utils'
import { BaseResponse } from './models/responses/baseResponse'

export const dataProvider = (url: string): DataProvider => ({
  getOne: async ({ resource, id }) => {
    const { data } = await axiosInstance.get<BaseResponse<any>>(
      `${url}/${resource}/${id}`
    )

    return data.data
  },

  getList: async ({ resource, pagination, sorters }) => {
    const { current, pageSize } = pagination ?? {}
    const { data } = await axiosInstance.get<BaseResponse<any>>(
      `${url}/${resource}`,
      {
        params: {
          page: current,
          size: pageSize,
          sortName: sorters?.[0]?.field ?? 'id',
          sortDir: sorters?.[0]?.order ?? 'asc',
        },
      }
    )
    return data.data
  },
  create: async ({ resource, variables }) => {
    const { data } = await axiosInstance.post<BaseResponse<any>>(
      `${url}/${resource}`,
      variables
    )
    return data.data
  },
  update: async () => {
    throw new Error('Not implemented')
  },
  deleteOne: async ({ id, resource }) => {
    const { data } = await axiosInstance.delete<BaseResponse<any>>(
      `${url}/${resource}/${id}`
    )
    return data.data
  },
  getApiUrl: () => url,
})
