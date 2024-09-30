import React from 'react'
import { Form, redirect, useActionData, useLoaderData, useNavigation } from 'react-router-dom'
import {loginUser} from '../api'

type Props = {}

export function loader({request}){
   return new URL(request.url).searchParams.get("message")
}
export async function action({request}){
  const formData =  await request.formData();
  const email = formData.get("email")
  const password = formData.get("password")
  const pathname = 
    new URL(request.url).searchParams.get("redirectTo") || "/create"
  try{
    const data = await loginUser({email,password})
    localStorage.setItem("userLogin", "true")
    const res = redirect(pathname)
    res.body = true;
    return res
  } catch(err){
    return err
  }
}

export default function Login({}: Props) {
  const error = useActionData()
  const message = useLoaderData()
  const navigate = useNavigation()



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
            <button disabled={navigate.state=== "submitting"}>
              {navigate.state === "submitting"
                ? "Logging in..." 
                : "Log in"
              }
            </button>
        </Form>
    </div>
  )
}