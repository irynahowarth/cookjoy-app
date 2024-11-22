import React from 'react'
import RecipeForm from './RecipeForm'

type Props = {}

export default function EditRecipe({}: Props) {
  return (
    <>
      <div>EditRecipe</div>
      <RecipeForm
      initValues={{}}
      // onSubmit={handleAddRecipe}
      submitButtonLabel="Edit Recipe"
    />
    </>
  )
}