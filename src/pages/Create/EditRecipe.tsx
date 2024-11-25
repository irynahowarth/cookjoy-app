import React from 'react'
import RecipeForm from '../../components/RecipeForm'
import { useActionData, useParams } from 'react-router-dom'
import {getRecipe} from '../../api'

type Props = {}

export default function EditRecipe({}: Props) {
  const [submitted, setSubmitted] = React.useState(false)
  const [recipe, setRecipe] = React.useState(null);
  const actionData = useActionData()
  const {id}= useParams()

  React.useEffect(()=>{
    async function loadRecipe(){
      const recipeData =  await getRecipe(id)
      setRecipe(recipeData)
    }
    loadRecipe()
  },[id])

  if (!recipe) {
    return <p>Loading recipe for editing...</p>;
  }

  return (
    <>
      <div>EditRecipe</div>
      
      <RecipeForm
      initValues={recipe}
      // onSubmit={handleAddRecipe}
      submitButtonLabel="Edit Recipe"
    />
    </>
  )
}