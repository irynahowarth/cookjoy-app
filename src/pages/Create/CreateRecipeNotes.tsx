import React from 'react'
import { useOutletContext } from 'react-router-dom';

type Props = {}

export default function CreateRecipeNotes({}: Props) {
  const currentRecipe = useOutletContext();
  return (
    <div>
      CreateRecipeNotes
      <p>Cooking minutes: {currentRecipe.cookingMinutes}</p>
    </div>
  )
}