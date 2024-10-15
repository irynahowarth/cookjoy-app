import React from 'react'

export const AuthContext = React.createContext(
  {
    isAuthenticated: false,
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

  const [isAuthenticated, setAuthenticated] = React.useState(false);

  const login = () => {
    console.log('login')
    setAuthenticated(true);
  }

  const logout = () => {
      setAuthenticated(false);
  }
  return (
      <AuthContext.Provider value={{isAuthenticated: isAuthenticated, login: login, logout: logout}}>
          {children}
      </AuthContext.Provider>
  )
}