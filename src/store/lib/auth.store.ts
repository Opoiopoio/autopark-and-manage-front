import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const name = ref<string>()
  const markerColor = ref<string>()
  const accessToken = ref<string>()
  const refreshToken = ref<string>()

  return { name, markerColor, accessToken, refreshToken }
})
