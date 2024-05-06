import { AxiosError, AxiosInstance } from 'axios'
import { AuthState, IInterceptorsHanger, IStatusCodeHandler } from '@/model'
import { useAuthStore } from '@/store'

export class InterceptorsHanger implements IInterceptorsHanger {
  private readonly _instance: AxiosInstance
  private readonly _authStore: AuthState
  private readonly _statusCodeHandler: IStatusCodeHandler
  constructor(instance: AxiosInstance, statusCodeHandler: IStatusCodeHandler) {
    this._instance = instance
    this._authStore = useAuthStore()
    this._statusCodeHandler = statusCodeHandler
  }

  run() {
    this.addRequestInterceptors()
    this.addResponseInterceptors()
  }

  private addRequestInterceptors() {
    this._instance.interceptors.request.use(
      (reqeust) => {
        reqeust.headers.Authorization = `Bearer ${this._authStore.accessToken}`
        return reqeust
      },
      (reqeust) => Promise.reject(reqeust)
    )
  }

  private addResponseInterceptors() {
    this._instance.interceptors.response.use(
      (response) => response,
      (response: AxiosError) => {
        return this._statusCodeHandler.run(response)
      }
    )
  }
}
