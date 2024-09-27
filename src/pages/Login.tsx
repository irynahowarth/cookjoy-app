import React from 'react'
import { useLoaderData } from 'react-router-dom'
import {loginUser} from '../api'

type Props = {}

export function loader({request}){
   return new URL(request.url).searchParams.get("message")
}

export default function Login({}: Props) {
  
  const [loginFormData, setLoginFormData] = React.useState({email: "", password: ""})
  const [status, setStatus] = React.useState("idle")
  const [error, setError] = React.useState(null)

  const message = useLoaderData()

  async function handleSubmit(e){
    e.preventDefault()
    setStatus("submitting")
    setError(null)
    try{
      const res = await loginUser(loginFormData)
      const data = await res
      console.log(data)
    } catch(err){
      setError(err)
    } finally{
      setStatus("idle")
    }
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
        {error && <h3>{error.message}</h3>}
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
            <button disabled={status=== "submitting"}>Log in</button>
        </form>
    </div>
  )
}