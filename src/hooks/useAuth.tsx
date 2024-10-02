import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

const AuthContext = React.createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = React.useState("user")
    // const navigate = useNavigate();

    const login = async(data) => {
        setUser(data)
    }

    const logout = ()=>{
        setUser(null)
        // navigate("/", {replace: true})
    }

    const value = React.useMemo(()=>({
        user, login, logout
    }), [user])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  return (
    useContext(AuthContext)
  )
}
