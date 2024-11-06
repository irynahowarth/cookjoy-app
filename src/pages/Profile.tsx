import React from 'react'
import { Form, useActionData, useLoaderData } from 'react-router-dom'
import {
    updateUserProfile} from '../api'
import useAuth from '../context/auth'
import icon from '../assets/icons/icon-user-default.svg'

export async function action({request}){
    const formData =  await request.formData();
    try{
        const data = await updateUserProfile(formData)
      return data
    } catch(err){
      return err
    }
  }


export default function Profile() {
    const {user} = useAuth()
    const [editing, setEditing] = React.useState(false)
    const actionData = useActionData()

    React.useEffect(()=>{
        if(actionData && actionData.message){
          setEditing(false)
        }
    },[actionData])

    const inputStyles = 'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10 px-2 py-1 text-base/6 sm:text-sm/6 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black'
    const labelStyles ='text-sm/5 font-medium'
    const btnStyles = 'mt-8 w-full inline-flex items-center justify-center px-4 py-2 rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-normal text-white disabled:bg-gray-950 hover:bg-gray-800 disabled:opacity-40'
   
  return (
    <div className='isolate flex h-dvh items-center justify-center mb-10'>
      <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5 p-7 sm:p-11 ">
        <h2 className="inline-flex items-center rounded-full mb-8 px-4 py-1 text-pink-600 ring-1 ring-inset ring-pink-600"><span className=" text-base font-base tracking-tight">{editing? 'Editing':'User'} Profile</span></h2>
        {!editing &&
        <>
        {actionData && <p className="mt-3 ml-7 sm:ml-11 text-sm/5 text-red-600">{actionData.message}</p>}
            <div className='p-7 sm:p-11 '>
                <div className='aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10'>
                    
                    <img 
                        src = {user.photoURL? user.photoURL:icon}
                        alt={`${user.displayName? user.displayName: "User"}`+"'s profile image"}
                        className='block size-full object-cover'
                    />
                    
                </div>
                <h4 className='mt-6 font-semibold'>Name: <span  className='font-normal text-sm/5 text-gray-700'>{user.displayName}</span></h4>
                <h4 className='mt-6 font-semibold'>Email: <span className='font-normal text-sm/5 text-gray-700'>{user.email}</span></h4>
                <button 
                    onClick={()=>setEditing(true)}
                    className={btnStyles}
                >Edit Profile</button>
            </div>
        </>
        }
        {editing &&
            <Form method="post" replace >
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
                {/* <div className="mt-6 space-y-3">
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
                </div> */}
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
                <button className={btnStyles}>Update Profile</button>
            </Form>
        }
      </div>
    </div>
  )
}
