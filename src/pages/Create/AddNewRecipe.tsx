import React from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import useDishTypes from '../../context/useDishTypes'
import {addNewRecipe} from '../../api'

type Props = {}

export async function action({request}){
  const formData =  await request.formData();
   
    return addNewRecipe(formData)

    try {
        const result = await addNewRecipe(formData);
    
        // Return success response with recipe ID
        if (result.success) {
          return { success: true, id: result.id };
        } else {
          return { success: false, error: 'Failed to add recipe' };
        }
      } catch (error) {
        // Handle errors during recipe addition
        return { success: false, error: error.message || 'Unknown error occurred' };
      }
}




export default function AddNewRecipe({}: Props) {
    const { dishTypes, loading } = useDishTypes();
    const [submitted, setSubmitted] = React.useState(false)
    const actionData = useActionData()

    // Set submitted state when actionData is available 
   React.useEffect(() => {
       if (actionData) {
           setSubmitted(true);
       }
   }, [actionData])

    // Early return for loading state
    if (loading) {
        return <p>Loading dish types...</p>;
      }
        
    
      const allDishTypes= dishTypes.map(el=>el?.name)

    const inputStyles = 'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10 px-2 py-1 text-base/6 sm:text-sm/6 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black'
    const labelStyles ='text-sm/5 font-medium'
    
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
      <div>
        <Form method="post" replace className=''>
            <div className="mt-6 space-y-3">
                <label 
                htmlFor="title"
                className={labelStyles}
                >Title</label>
                <input 
                className={inputStyles}
                required
                name="title"
                id="title"
                type="text" 
                placeholder="Enter recipe's title"
                />
            </div>
            <div className="mt-6 space-y-3">
                <label 
                htmlFor="servings"
                className={labelStyles}
                >Servings</label>
                <input 
                className={inputStyles}
                required
                name="servings"
                id="servings"
                type="number" 
                placeholder="Number of servings"
                />
            </div>
            <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
                <button type='submit'>Save recipe</button>
                <button type='reset'>Clear</button>
            </div>
        </Form>
      </div> ): (
         <div className="mt-6">
         <p className="text-green-600">Recipe submitted successfully!</p>
         <button
           onClick={() => setSubmitted(false)}
         >
           Add another recipe
         </button>
       </div>
      )}
    </div>
  )
}