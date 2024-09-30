import React from 'react'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import {loginUser} from '../api'

type Props = {}

export function loader({request}){
   return new URL(request.url).searchParams.get("message")
}
export async function action({request}){
  const formData =  await request.formData();
  const email = formData.get("email")
  const password = formData.get("password")
  const data = await loginUser({email,password})
  localStorage.setItem("userLogin", "true")
  const res = redirect("/create")
  res.body = true;
  return res
}

export default function Login({}: Props) {
  const [status, setStatus] = React.useState("idle")
  const [error, setError] = React.useState(null)

  const message = useLoaderData()
  const navigate = useNavigate()

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



  return (
    <div>
        <h2>Log in to your accout</h2>
        {message && <h3>{message}</h3>}
        {error && <h3>{error.message}</h3>}
        <Form method="post" replace>
            <label htmlFor="email">Email</label>
            <input 
                name="email"
                id="email"
                type="email" 
                placeholder='Enter your email address'
            />
            <label htmlFor="password">Password</label>
            <input 
                name="password"
                id="password"
                type="password" 
                placeholder='Enter your password'
            />
            <button disabled={status=== "submitting"}>Log in</button>
        </Form>
    </div>
  )
}