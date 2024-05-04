import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthState } from '@/model'

export const useAuthStore = defineStore('auth', (): AuthState => {
  const name = ref<string>()
  const markerColor = ref<string>()
  const accessToken = ref<string>()
  const refreshToken = ref<string>()

  if (import.meta.env.DEV) {
    markerColor.value = '#fff'
    name.value = 'Остапчук Семен Тимофеевич'
  }

  return { name, markerColor, accessToken, refreshToken }
})
