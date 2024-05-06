import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const name = ref<string>()
  const markerColor = ref<string>()
  const accessToken = ref<string>()
  const refreshToken = ref<string>()
  const roles = reactive(new Set<string>())

  if (import.meta.env.DEV) {
    markerColor.value = '#fff'
    name.value = 'Остапчук Семен Тимофеевич'
  }

  return { name, markerColor, accessToken, refreshToken, roles }
})
