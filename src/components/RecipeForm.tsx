import React from 'react'
import { Form, redirect, useActionData, useNavigate } from 'react-router-dom';
import useDishTypes from '../context/useDishTypes';
import {addNewRecipe, updateRecipe} from '../api'

type Props = {}



export async function action({request, params}){
  const formData =  await request.formData();
  const recipeData = Object.fromEntries(formData);

  try{
    const result = params.id
      // If an ID exists, update the recipe
      ? await updateRecipe(params.id, formData)
        //Otherwise, add a new recipe
      :await addNewRecipe(formData);

    if (result.success) {
      return { success: true, id: result.id };
    } else {
      return { success: false, error: 'Failed to save recipe' };
    }
  } catch(error){
      // Handle errors during recipe update
      return { success: false, error: error.message || 'Unknown error occurred' };
  }
  // return redirect(`/recipes/${params.id}`);

}

export default function RecipeForm({ 
  initValues = {},   
  submitButtonLabel = 'Save' }: Props) {
  
  const [formState, setFormState] = React.useState({
    title: initValues.title || "",
    servings: initValues.servings || 1,
    description: initValues.description || "",
    ingredients: initValues.ingredients || [{ name: "", amount: "", unit: "" }],
    dishTypes: initValues.dishTypes || [],
    instructions: (initValues.instructions || []).join("\n"),
  });
  const { dishTypes, loading } = useDishTypes();
  const actionData = useActionData();


  // Reset form fields
  const resetForm = () => {
    setFormState((prev)=>({ ...prev, ingredients: [{ name: '', amount: '', unit: '' }]}))
  };
  // Set submitted state when actionData is available 
  React.useEffect(() => {
    if (actionData) {
        resetForm();
    }
  }, [actionData])

  // Early return for loading state
  if (loading) {
    return <p>Loading dish types...</p>;
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      dishTypes: checked
        ? [...prev.dishTypes, value]
        : prev.dishTypes.filter((type) => type !== value),
    }));
  };


  // Handle ingredient field change
  const handleIngredientChange = (index, field, value) => {
    setFormState((prev) => {
      const updatedIngredients = [...prev.ingredients];
      updatedIngredients[index][field] = value;
      return { ...prev, ingredients: updatedIngredients };
    });
  };

   // Serialize ingredients to a JSON string
  const serializeIngredients = () => JSON.stringify(formState.ingredients);
  // Add new ingredient field
  const addIngredient = () => {
      setFormState((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, { name: "", amount: "", unit: "" }],
      }));
  };

  // Remove ingredient field
  const removeIngredient = (index) => {
    setFormState((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

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
              value={formState.title}
              onChange={handleInputChange}
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
                value={formState.servings}
                onChange={handleInputChange}
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
                        checked={formState.dishTypes.includes(type)}
                        onChange={handleCheckboxChange}
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
                value={formState.description}
                onChange={handleInputChange}
                />
            </div>
            {/* Ingredients List */}
            <div className="mt-6 space-y-3">
            <label className={labelStyles}>Ingredients</label>
            {formState.ingredients.map((ingredient, index) => (
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
                value={formState.instructions}
                onChange={handleInputChange}
                />
            </div>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
                <button 
                    type='submit'
                    className={darkBtnStyles}
                > {submitButtonLabel? submitButtonLabel: 'Save'} recipe</button>
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
 
