import React from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import {getCreateRecipes} from "../../api"
import {requireAuth} from "../../utils"

type Props = {}

export async function loader(){
  await requireAuth()
  return getCreateRecipes();
}

export default function CreateRecipes({}: Props) {
  const recipes = useLoaderData();
  const recipeElements = recipes.map((rec:RecipeProps) => (
    <Link 
      to={`./${rec.id}`} 
      key={rec.id}
      aria-label={`View details for ${rec.title}`}
    >
      <div><p>{rec.title}</p></div>
    </Link>
  ))
  return (
    <div>
      <h2>All Creator's Recipes</h2>
      <div>
          <section>
          {recipeElements}
          </section>
      </div>
    </div>
  )
}