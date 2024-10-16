import React from 'react'
import { Form, redirect, useActionData, useLoaderData, useNavigate, useNavigation } from 'react-router-dom'
import {loginUser} from '../api'
import useAuth from '../context/auth'

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
    return data
  } catch(err){
    return err
  }
}

export default function Login({}: Props) {
  const actionData = useActionData()
  const message = useLoaderData()
  const navigate = useNavigation()
  const nav = useNavigate()

  const {login} = useAuth()

  React.useEffect(()=>{
    if(actionData && !actionData.status){
      login()
      nav('/create')
    }
  },[actionData])

  return (
    <div>
        <h2>Log in to your accout</h2>
        {message && <h3>{message}</h3>}
        {actionData && <h3>{actionData.message}</h3>}
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