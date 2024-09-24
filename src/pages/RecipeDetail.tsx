import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import {getRecipes} from '../api'

type Props = {}

export function loader({params}){
  return getRecipes(params.id)
}

export default function RecipeDetail({}: Props) {
  const recipe = useLoaderData();
  return (
    <div>
      {
      recipe ? (
        <div>
          <h2>{recipe.title}</h2>
        </div>
      ) : <h2>Recipe is loading...</h2>}
    </div>
  )
}