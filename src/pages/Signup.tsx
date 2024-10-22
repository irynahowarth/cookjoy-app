import React from 'react'
import { Form, useNavigation, Link } from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigation()
    const inputStyles = 'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10 px-2 py-1 text-base/6 sm:text-sm/6 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black'
    const labelStyles ='text-sm/5 font-medium'
    return (
        <div className='isolate flex h-dvh items-center justify-center mb-10'>
      <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
        <Form method="post" replace className='p-7 sm:p-11 '>
            <h2 className='mt-8 text-base/6 font-medium'>Get started for free!</h2>
            <p className="mt-4 text-sm/5 text-gray-600">
              Already registered?{" "} 
              <Link aria-label="Login" to="/login" className="font-medium text-pink-600 hover:underline">Login</Link>{" "}
              to your account.</p>
            
            {/* {message && <p className="mt-3 text-sm/5 text-red-600">{message}</p>} */}
            {/* {actionData && <p className="mt-3 text-sm/5 text-red-600">{actionData.message}</p>} */}
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <div className="space-y-3">
                <label htmlFor="firstName" className={labelStyles}>First Name</label>
                <input 
                    name="firstName"
                    id="firstName"
                    type="text" 
                    placeholder='Enter your name'
                    required
                    autoComplete='firstName'
                    className={inputStyles}
                />
              </div>
              <div className='space-y-3'>
                <label htmlFor="LastName" className={labelStyles}>Last Name</label>
                <input 
                    name="LastName"
                    id="LastName"
                    type="text" 
                    placeholder='Enter your last name'
                    required
                    autoComplete='LastName'
                    className={inputStyles}
                  />
              </div>
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
                placeholder='Enter your email address'
              />
            </div>
            <div className="mt-6 space-y-3">
              <label 
                htmlFor="password"
                className={labelStyles}
              >Password</label>
              <input 
                  required
                  className={inputStyles}
                  name="password"
                //   id="password"
                  type="password" 
                  placeholder='Enter your password'
              />
            </div>
            <button 
              className='mt-8 w-full inline-flex items-center justify-center px-4 py-2 rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-normal text-white disabled:bg-gray-950 hover:bg-gray-800 disabled:opacity-40'
              disabled={navigate.state=== "submitting"}>
              {navigate.state === "submitting"
                ? "Signing up..." 
                : "Sign up"
              }
            </button>
            
        </Form>
        <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">Already have an account? <a className="font-medium hover:text-gray-600"  href="/login">Login to your account</a></div>
      </div>
    </div>
  )
}
