import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { IStatusCodeHandler } from '@/model'

const OnStatusCodeActionEnum: Record<number, Exclude<keyof StatusCodeHandler, 'run'>> = {
  401: 'onUnauthorized',
  404: 'onNotFound',
}

export class StatusCodeHandler implements IStatusCodeHandler {
  private readonly _instance: AxiosInstance
  constructor(instance: AxiosInstance) {
    this._instance = instance
  }

  async run(response: AxiosError) {
    if (response.response?.status) {
      const methodName = OnStatusCodeActionEnum[response.response.status]

      return await this[methodName](response)
    }
    throw response
  }

  async onUnauthorized(response: AxiosError) {
    return response.response as AxiosResponse
  }
  onNotFound(response: AxiosError) {
    return response.response as AxiosResponse
  }
}
