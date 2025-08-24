import { ref } from 'vue'

const token = ref<string | null>(localStorage.getItem('token'))
const loggedIn = ref<boolean>(!!token.value)

export const useAuthStore = () => {
  const authorizeByToken = (newToken: string): void => {
    localStorage.setItem('token', newToken)
    token.value = newToken
    loggedIn.value = true
  }

  const logout = (): void => {
    localStorage.removeItem('token')
    token.value = null
    loggedIn.value = false
  }

  return {
    token,
    loggedIn,
    authorizeByToken,
    logout,
  }
}
