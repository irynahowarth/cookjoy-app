import React from 'react'
import RecipeForm from '../../components/RecipeForm'
import {useActionData, useLocation, useNavigate, useParams } from 'react-router-dom'
import {getRecipe} from '../../api'

type Props = {}

export default function EditRecipe({}: Props) {
  const [submitted, setSubmitted] = React.useState(false)
  const [recipe, setRecipe] = React.useState(null);
  const actionData = useActionData()
  const navigate = useNavigate();
  const location = useLocation();
  const {id}= useParams()

  const handleNavigate = () => {
    // Extract the base path without "edit"
    const basePath = location.pathname.replace(/\/edit$/, "");
    navigate(basePath);
  };

  React.useEffect(()=>{
    async function loadRecipe(){
      const recipeData =  await getRecipe(id)
      setRecipe(recipeData)
    }
    loadRecipe()
  },[id])

  React.useEffect(() => {
    if (actionData) {
        setSubmitted(true);
    }
}, [actionData])

  if (!recipe) {
    return <p>Loading recipe for editing...</p>;
  }

  const darkBtnStyles = 'inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white disabled:bg-gray-950 hover:bg-gray-800 disabled:opacity-40'
  const lightBtnStyles = 'relative inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15 after:absolute after:inset-0 after:rounded-full  whitespace-nowrap text-base font-medium text-gray-950 disabled:bg-white/15 hover:bg-white/20 disabled:opacity-40'
  return (
    <>
      <div>EditRecipe</div>
      {/* Conditionally render form or success message */}
      {!submitted ? (
        <RecipeForm
          initValues={recipe}
          submitButtonLabel="Edit Recipe"
        />
      ): (
          <div className="mt-6">
          <p className="text-green-600 mb-6">Recipe updated successfully!</p>
          <button
            onClick={() => setSubmitted(false)}
            className={darkBtnStyles}
          >
           Edit again
          </button>
          <button
            onClick={handleNavigate}
            className={lightBtnStyles}
          >
           Show details
          </button>
        </div>
      )}
    </>
  )
}