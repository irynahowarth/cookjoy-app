import React from 'react'
import { useLocalStorage } from './useLocalStorage';

export const AuthContext = React.createContext(
  {
    user: null,
    login: () => {},
    logout: () => {}
}
);

export default function useAuth() {
  return (
    React.useContext(AuthContext)
  )
}

export function AuthProvider({ children }){
  const [user, setUser] = useLocalStorage('user', null)

  const login = async (data) => {
    setUser(data)
  }

  const logout = () => {
      setUser(null);
  }

  const value = React.useMemo(
    ()=>({
      user,
      login,
      logout
    }),[user]
  )

  return (
      <AuthContext.Provider value={value}>
          {children}
      </AuthContext.Provider>
  )
}