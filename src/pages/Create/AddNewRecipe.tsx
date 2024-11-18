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
    const [ingredients, setIngredients] = React.useState([{ name: '', amount: '', unit: '' }]);
    const actionData = useActionData()

    // Reset form fields
    const resetForm = () => {
        setIngredients([{ name: '', amount: '', unit: '' }]);
    };
    // Set submitted state when actionData is available 
   React.useEffect(() => {
       if (actionData) {
           resetForm();
           setSubmitted(true);
       }
   }, [actionData])

    // Early return for loading state
    if (loading) {
        return <p>Loading dish types...</p>;
      }
        
    
    const allDishTypes= dishTypes.map(el=>el?.name)

    // Handle ingredient field change
    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };
     // Serialize ingredients to a JSON string
    const serializeIngredients = () => JSON.stringify(ingredients);
    // Add new ingredient field
    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
    };

    // Remove ingredient field
    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const inputStyles = 'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10 px-2 py-1 text-base/6 sm:text-sm/6 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black'
    const labelStyles ='text-sm/5 font-medium'
    const darkBtnStyles = 'inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white disabled:bg-gray-950 hover:bg-gray-800 disabled:opacity-40'
    const lightBtnStyles = 'relative inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15 after:absolute after:inset-0 after:rounded-full  whitespace-nowrap text-base font-medium text-gray-950 disabled:bg-white/15 hover:bg-white/20 disabled:opacity-40'
    
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
            <div className="mt-6 space-y-3">
                <label className={labelStyles}>Dish Type</label>
                <div className=" flex items-center align-middle gap-x-8 gap-y-4 flex-wrap">
                    {allDishTypes.map((type) => (
                    <div key={type} className="flex items-center">
                        <input
                        type="checkbox"
                        id={`dishType-${type}`}
                        name="dishTypes"
                        value={type}
                        className="mr-2"
                        />
                        <label htmlFor={`dishType-${type}`} className="text-sm">
                        {type}
                        </label>
                    </div>
                    ))}
                </div>
            </div>
            <div className="mt-6 space-y-3">
                <label 
                htmlFor="description"
                className={labelStyles}
                >Description</label>
                <textarea 
                name="description" 
                id="description"
                rows="3"
                className={inputStyles}
                ></textarea>
            </div>

            {/* Ingredients List */}
            <div className="mt-6 space-y-3">
            <label className={labelStyles}>Ingredients</label>
            {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2 items-center">
                <input
                    type="text"
                    className={inputStyles}
                    placeholder="Ingredient Name"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    required
                />
                <input
                    type="number"
                    className={`${inputStyles} max-w-28 text-right`}
                    placeholder="Amount"
                    value={ingredient.amount}
                    onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Unit"
                    className={`${inputStyles} max-w-20`}
                    value={ingredient.unit}
                    required
                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                />
                <button type="button" className={lightBtnStyles} onClick={() => removeIngredient(index)}>
                    X
                </button>
                </div>
            ))}
            <button type="button" className={darkBtnStyles} onClick={addIngredient}>+ Ingredient</button>
            {/* Hidden input field for serialized ingredients */}
            <input
                type="hidden"
                name="ingredients"
                value={serializeIngredients()}
            />
            </div>
            <div className="mt-6 space-y-3">
                <label 
                htmlFor="instructions"
                className={labelStyles}
                >Instructions</label>
                <textarea 
                name="instructions" 
                id="instructions"
                rows="6"
                placeholder="Enter step-by-step instructions"
                required
                className={inputStyles}
                ></textarea>
            </div>
            <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
                <button 
                    type='submit'
                    className={darkBtnStyles}
                >Save recipe</button>
                <button 
                    type='reset'
                    className={lightBtnStyles}
                >Clear</button>
            </div>
        </Form>
      </div> ): (
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