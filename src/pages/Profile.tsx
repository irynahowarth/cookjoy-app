import React from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import {
    getUserProfile,
    updateUserProfile} from '../api'

export async function action({request}){
    const formData =  await request.formData();
    const displayName = formData.get("displayName")
    const email = formData.get("email")
     try{
      const data = await updateUserProfile()
      return data
    } catch(err){
      return err
    }
  }

export async function loader() {
    return 'loader'
}

export default function Profile() {
    const profile = useLoaderData();
    console.log(profile)
  return (
    <div className='isolate flex h-dvh items-center justify-center mb-10'>
      <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
        <h2 className='mt-8 text-base/6 font-medium'>User Profile</h2>
      <Form method="post" replace className='p-7 sm:p-11 '>
        
        <button>Edit profile</button>
      </Form>
      </div>
    </div>
  )
}
