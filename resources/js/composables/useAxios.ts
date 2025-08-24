import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@/composables/useAuthStore'
import { useNotification } from 'naive-ui'
import { format } from 'date-fns'

export const useAxios = () => {
  const authStore = useAuthStore()
  const notification = useNotification()

  const instance = axios.create({
    baseURL: '/api',
  })

  instance.interceptors.request.use((config) => {
    if (authStore.token.value) {
      config.headers.Authorization = `Bearer ${authStore.token.value}`
    }

    return config
  })

  instance.interceptors.response.use((response) => {
    response.ok = true

    return response
  }, (error: AxiosError) => {
    if (error.response?.status === 401) {
      authStore.logout()

      window.location.reload()
    }

    if (error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
      notification.error({
        title: 'Error',
        content: error.response.data.message as string,
        meta: format(new Date(), 'dd.MM.yyyy HH:mm'),
      })
    }

    return Promise.resolve(error)
  })

  return instance
}
