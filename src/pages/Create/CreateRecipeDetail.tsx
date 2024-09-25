import React from 'react'
import { NavLink, Outlet, useLoaderData, useParams } from 'react-router-dom';
import {getCreateRecipes} from "../../api"
import {requireAuth} from "../../utils"

type Props = {}

export async function loader({params}){
  await requireAuth()
  return getCreateRecipes(params.id)
}

export default function CreateRecipeDetail({}: Props) {
  const currentRecipe = useLoaderData();
  
  if (!currentRecipe) {
    return <h2>Recipe is loading...</h2>
  }
  
  return (
    <div>
        <div>
          <h2>{currentRecipe.title}</h2>
          <img src={currentRecipe.image} width={150} />
        </div>
        <nav>
          <NavLink to="." end>Info</NavLink>
          <NavLink to="photos">Photos</NavLink>
          <NavLink to="notes">Notes</NavLink>
        </nav>
      <Outlet context={currentRecipe}/>
    </div>
  )
}