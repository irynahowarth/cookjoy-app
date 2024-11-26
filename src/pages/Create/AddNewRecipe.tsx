import React from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import useDishTypes from '../../context/useDishTypes'
import {addNewRecipe} from '../../api'
import RecipeForm from '../../components/RecipeForm'

type Props = {}

export default function AddNewRecipe({}: Props) {
    const [submitted, setSubmitted] = React.useState(false)
    const actionData = useActionData()

  //   // Set submitted state when actionData is available 
   React.useEffect(() => {
       if (actionData) {
          //  resetForm();
           setSubmitted(true);
       }
   }, [actionData])

    const darkBtnStyles = 'inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white disabled:bg-gray-950 hover:bg-gray-800 disabled:opacity-40'
  
    
  return (
    <div className='mt-6 px-4'>
      <h2 className="inline-flex items-center rounded-full px-4 mb-6 py-1 text-pink-600 ring-1 ring-inset ring-pink-600" >
        <span className="font-mono text-sm" aria-hidden="true">04</span>
        <span className="ml-3 h-3.5 w-px bg-pink-600/20"></span>
        <span className="ml-3 text-base font-base tracking-tight">Add Recipe</span>
      </h2>
      <h2 className='text-2xl font-medium tracking-tight'>Add New Recipe</h2>
      
      {/* Conditionally render form or success message */}
      {!submitted ? (
      <RecipeForm
        initValues={{}}
        submitButtonLabel="Add new"
      />
    ): (
         <div className="mt-6">
         <p className="text-green-600 mb-6">Recipe submitted successfully!</p>
         <button
           onClick={() => setSubmitted(false)}
           className={darkBtnStyles}
         >
           Add another recipe
         </button>
       </div>
      )}
    </div>
  )
}