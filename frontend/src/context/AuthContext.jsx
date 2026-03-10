import { createContext, useContext, useEffect, useState } from 'react'
import { apiClient, setAuthToken } from '../services/apiClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('erp_auth')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed.user)
      setAuthToken(parsed.token)
    }
    setLoading(false)
  }, [])

  async function login(email, password) {
    const { data } = await apiClient.post('/auth/login', { email, password })
    setUser(data.user)
    setAuthToken(data.token)
    localStorage.setItem('erp_auth', JSON.stringify(data))
    return data.user
  }

  function logout() {
    setUser(null)
    setAuthToken(null)
    localStorage.removeItem('erp_auth')
  }

  const value = { user, login, logout, loading }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

