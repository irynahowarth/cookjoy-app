import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import {getRecipeWithUser} from '../api'
import RecipeIngredients from '../components/RecipeIngredients'
import RecipeInstructions from '../components/RecipeInstructions'


type Props = {}

export function loader({params}){
  return getRecipeWithUser(params.id)
}

export default function RecipeDetail({}: Props) {
  const {recipe, user} = useLoaderData();
  const navigate = useNavigate();
  // console.log(recipe)
  const userPhoto =  user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  return (
    <main className='mt-16 px-6 lg:px-8'>
      <div className="mx-auto max-w-2xl lg:max-w-7xl px-4 sm:px-6">
        {
        recipe ? (
          <div>
            <p className="mt-16 font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500">Monday, October 14, 2024</p>
            <h2 className='mt-2 text-pretty text-4xl font-medium tracking-tighter text-gray-950 sm:text-6xl'>{recipe.title}</h2>
            <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
              <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
                <div className="flex items-center gap-3">
                
                  <img src={userPhoto} alt="User Profile Image" className="aspect-square size-6 rounded-full object-cover" />
                  <div className="text-sm/5 text-gray-700">{user.name}</div>
                </div>
                {recipe.dishTypes.length > 0 && 
                  <div className="flex flex-wrap gap-2">
                      {recipe.dishTypes.map((dish,index)=>(
                          <button  
                          key={dish+index}
                          onClick={()=>navigate(`/recipes?type=${dish}`)}
                          className='z-0 rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500'
                          >{dish[0].toUpperCase()+dish.slice(1)}</button>
                      ))}
                  </div>}
              </div>
              <div className="text-gray-700">
                <div className="max-w-2xl xl:mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1657313938000-23c4322dbe22?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Recipe photo" 
                    className='mb-10 aspect-[3/2] w-full rounded-2xl object-cover shadow-xl'
                    />
                  {recipe.description && <p>{recipe.description}</p>}
                  {recipe?.ingredients && <RecipeIngredients ingredients={recipe.ingredients}/>}
                  {recipe?.instructions && <RecipeInstructions instructions={recipe.instructions}/>}
                </div>
            <div className="mt-12">
                <a href="/recipes" className="inline-flex items-center justify-center px-2 py-1 rounded-lg border border-transparent shadow ring-1 ring-black/10 whitespace-nowrap text-sm font-medium text-gray-950 disabled:bg-transparent hover:bg-gray-50 disabled:opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" className="size-4"><path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd"></path></svg>
                Back to recipes</a>
            </div>
              </div>
            </div>
          </div>
        ) : <h2>Recipe is loading...</h2>}
      </div>
    </main>
  )
}