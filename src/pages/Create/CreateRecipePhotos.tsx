import React from 'react'
import { useOutletContext } from 'react-router-dom';

type Props = {}

export default function CreateRecipePhotos({}: Props) {
  const currentRecipe = useOutletContext();
  return (
    <div>
      <p>CreateRecipePhotos</p>
      <img src={currentRecipe.image} width={300} />
    </div>
  )
}