import React from 'react'
import { Form, redirect, useActionData, useNavigate } from 'react-router-dom';
import useDishTypes from '../context/useDishTypes';

type Props = {}



export async function action({request, params}){
  const formData =  await request.formData();
  const recipeData = Object.fromEntries(formData);
    console.log(recipeData)
    if (params.id) {
        // If an ID exists, update the recipe
        console.log('update')
        return redirect(`/recipes/${params.id}`);
      } else {
        // Otherwise, add a new recipe
        console.log('new recipe')
        return redirect(`/recipes`);
      }

}

export default function RecipeForm({ 
  initValues,  
  submitButtonLabel }: Props) {
  
  const [formState, setFormState] = React.useState({
    title: initValues.title || "",
    servings: initValues.servings || 1,
    description: initValues.description || "",
    ingredients: initValues.ingredients || [{ name: "", amount: "", unit: "" }],
    dishTypes: initValues.dishTypes || [],
    instructions: initValues.instructions || "",
  });
  const [submitted, setSubmitted] = React.useState(false)
  const { dishTypes, loading } = useDishTypes();
  const actionData = useActionData();
  const navigate = useNavigate();

  // Reset form fields
  const resetForm = () => {
      // setIngredients([{ name: '', amount: '', unit: '' }]);
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
  const inputStyles = 'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10 px-2 py-1 text-base/6 sm:text-sm/6 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black'
  const labelStyles ='text-sm/5 font-medium'
  const darkBtnStyles = 'inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white disabled:bg-gray-950 hover:bg-gray-800 disabled:opacity-40'
  const lightBtnStyles = 'relative inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15 after:absolute after:inset-0 after:rounded-full  whitespace-nowrap text-base font-medium text-gray-950 disabled:bg-white/15 hover:bg-white/20 disabled:opacity-40'
    
  return (
    <div>
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
    </div>
  </div>
  )
}