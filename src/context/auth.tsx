import React from 'react'
import { useLocalStorage } from './useLocalStorage';
import {auth} from '../api'
import { signOut } from 'firebase/auth';

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

  const logout = async() => {
    try{
      await signOut(auth)
      setUser(null);
    } catch(error) {
      console.error(error)
    };
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