import axios, { AxiosInstance } from 'axios'

import { IHttpApi } from '@/model'
import config from '@/config'
import { StatusCodeHandler } from './status-code.handler'
import { InterceptorsHanger } from './interceptors.hanger'

export class HttpApi implements IHttpApi {
  private readonly _client: AxiosInstance
  constructor() {
    this._client = axios.create()
    const statusCodeHandler = new StatusCodeHandler(this._client)
    const interceptorsHanger = new InterceptorsHanger(this._client, statusCodeHandler)
    interceptorsHanger.run()
  }
  get<Res extends object>(resource: string, params: object): Promise<Res[]> {
    return this._client
      .get<Res[]>(`${config.baseUrl}/${resource}`, { params })
      .then(({ data }) => data)
  }
  put(resource: string, data: object): Promise<void> {
    return this._client.put(`${config.baseUrl}/${resource}`, data)
  }
  patch(resource: string, data: object): Promise<void> {
    return this._client.patch(`${config.baseUrl}/${resource}`, data)
  }
  delete(resource: string, params: object): Promise<void> {
    return this._client.delete(`${config.baseUrl}/${resource}`, { params })
  }
}
