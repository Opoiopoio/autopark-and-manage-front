import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface IHttpApi {
  get<Res extends object>(resource: string, data: object): Promise<Res[]>
  put(resource: string, data: object): Promise<void>
  patch(resource: string, data: object): Promise<void>
  delete(resource: string, data: object): Promise<void>
}

export interface IStatusCodeHandler {
  run(response: AxiosError): Promise<AxiosResponse>
}

export interface IInterceptorsHanger {
  run(): void
}

export interface ReqeustQueueItem {
  resolve(value: unknown): void
  reject(error: unknown): void
  config: InternalAxiosRequestConfig
}
