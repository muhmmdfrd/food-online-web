import { type AuthProvider } from '@refinedev/core'
import { auth } from './services/loginService'
import { UserResponse } from './models/responses/userResponse'

export const TOKEN_KEY = 'refine-auth'
export const CURRENT_USER_KEY = 'refine-current-user'
export const REFRESH_TOKEN_KEY = 'refine-refresh-token'

export const authProvider: AuthProvider = {
  login: async ({ url, username, password }) => {
    const response = await auth(url, { username, password })
    if (response.success) {
      localStorage.setItem(TOKEN_KEY, response.data?.token ?? '')
      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(response.data?.user) ?? ''
      )
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data?.code ?? '')
      return {
        success: true,
        redirectTo: '/',
      }
    }

    return {
      success: false,
      error: {
        name: 'Login Error',
        message: response.message,
      },
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY)
    return {
      success: true,
      redirectTo: '/login',
    }
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      return {
        authenticated: true,
      }
    }

    return {
      authenticated: false,
      redirectTo: '/login',
    }
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const currentUser = JSON.parse(
      localStorage.getItem(CURRENT_USER_KEY) ?? ''
    ) as UserResponse
    if (currentUser) {
      return {
        id: currentUser.id,
        name: currentUser.name,
        avatar: 'https://i.pravatar.cc/300',
      }
    }
    return null
  },
  onError: async (error) => {
    console.error(error)
    return { error }
  },
}
