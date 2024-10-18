import React from 'react'
import { NavLink, Outlet, useLoaderData, useParams } from 'react-router-dom';
import {getCreateRecipes} from "../../api"
import {requireAuth} from "../../utils"

type Props = {}

export async function loader({params, request}){
  await requireAuth(request)
  return getCreateRecipes(params.id)
}

export default function CreateRecipeDetail({}: Props) {
  const currentRecipe = useLoaderData();
  
  if (!currentRecipe) {
    return <h2>Recipe is loading...</h2>
  }
  
  return (
    <div className='mt-6 px-4'>
       <a href='/create/recipes' className="inline-flex items-center rounded-full px-4 mb-6 py-1 text-pink-600 ring-1 ring-inset ring-pink-600 hover:text-pink-800 hover:ring-pink-800" >
        <span className="font-mono text-sm" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" className="size-4"><path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd"></path></svg>
        </span>
        <span className="ml-1 text-base font-base tracking-tight">Back to Recipes</span>
      </a>
        <div>
          <h2 className='text-2xl font-medium tracking-tight'>{currentRecipe.title}</h2>
          <img src={currentRecipe.image} width={250} />
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