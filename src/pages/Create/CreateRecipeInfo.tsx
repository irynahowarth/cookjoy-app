import React from 'react'
import { useOutletContext } from 'react-router-dom'

type Props = {}

export default function CreateRecipeInfo({}: Props) {
  const currentRecipe = useOutletContext();
  return (
    <div>
      CreateRecipeInfo:
      <p>Servings: {currentRecipe.servings}</p>

    </div>
  )
}