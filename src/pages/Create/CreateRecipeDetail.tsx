import React from 'react'
import { NavLink, Outlet, useLoaderData, useParams } from 'react-router-dom';
import {getCreateRecipes} from "../../api"

type Props = {}

export function loader({params}){
  console.log(params.id)
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