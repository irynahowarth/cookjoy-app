import React from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import {
    updateUserProfile} from '../api'
import useAuth from '../context/auth'

export async function action({request}){
    const formData =  await request.formData();
    const displayName = formData.get("displayName")
    const email = formData.get("email")
    const photoURL = formData.get("photoURL")
    try{
        const data = await updateUserProfile()
        console.log(data)
      return data
    } catch(err){
      return err
    }
  }


export default function Profile() {
    const {user} = useAuth()
    const [editing, setEditing] = React.useState(false)

    const inputStyles = 'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10 px-2 py-1 text-base/6 sm:text-sm/6 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black'
    const labelStyles ='text-sm/5 font-medium'
   
  return (
    <div className='isolate flex h-dvh items-center justify-center mb-10'>
      <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
        <h2 className='mt-8 text-base/6 font-medium'>User Profile</h2>
        {!editing &&
            <div>
                <div><img src="https://avatars.githubusercontent.com/u/15159483?v=4" alt="" /></div>
                <h4>Name: <span>{user.displayName}</span></h4>
                <h4>Email: <span>{user.email}</span></h4>
                <button onClick={()=>setEditing(true)}>Edit profile</button>
            </div>
        }
        {editing &&
            <Form method="post" replace className='p-7 sm:p-11 '>
                <div className="mt-6 space-y-3">
                    <label 
                    htmlFor="displayName"
                    className={labelStyles}
                    >Name</label>
                    <input 
                    className={inputStyles}
                    required
                    name="displayName"
                    id="displayName"
                    type="displayName" 
                    defaultValue={user.displayName || null}
                    />
                </div>
                <div className="mt-6 space-y-3">
                    <label 
                    htmlFor="email"
                    className={labelStyles}
                    >Email</label>
                    <input 
                    className={inputStyles}
                    required
                    name="email"
                    id="email"
                    type="email" 
                    defaultValue={user.email || null}
                    />
                </div>
                <div className="mt-6 space-y-3">
                    <label 
                    htmlFor="photoURL"
                    className={labelStyles}
                    >PhotoURL</label>
                    <input 
                    className={inputStyles}
                    name="photoURL"
                    id="photoURL"
                    type="string" 
                    defaultValue={user.photoURL || null}
                    />
                </div>
                <button>Edit profile</button>
            </Form>
        }
      </div>
    </div>
  )
}
