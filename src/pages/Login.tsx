import React from 'react'
import { useLoaderData } from 'react-router-dom'

type Props = {}

export function loader({request}){
   return new URL(request.url).searchParams.get("message")
}

export default function Login({}: Props) {
  
  const [loginFormData, setLoginFormData] = React.useState({email: "", password: ""})

  const message = useLoaderData()

  function handleSubmit(e){
    e.preventDefault()
    console.log(loginFormData)
  }

  function handleChange(e){
    const {name, value} = e.target
    setLoginFormData(prev => ({
        ...prev, [name]:value
    }))
  }
  return (
    <div>
        <h2>Log in to your accout</h2>
        {message && <h3>{message}</h3>}
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input 
                name="email"
                id="email"
                type="email" 
                placeholder='Enter your email address'
                value={loginFormData.email}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input 
                name="password"
                id="password"
                type="password" 
                placeholder='Enter your password'
                value={loginFormData.password}
                onChange={handleChange}
            />
            <button type="submit">Log in</button>
        </form>
    </div>
  )
}