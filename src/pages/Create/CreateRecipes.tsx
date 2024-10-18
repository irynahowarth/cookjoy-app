import React from 'react'
import { Await, defer, Link, useLoaderData } from 'react-router-dom';
import {getCreateRecipes} from "../../api"
import {requireAuth} from "../../utils"

type Props = {}

export async function loader({request}){
  await requireAuth(request)
  return defer({createRecipes: getCreateRecipes()});
}

export default function CreateRecipes({}: Props) {
  const dataPromise = useLoaderData();
  
  function renderCreateRecipes(recipes){
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
      <section>
        {recipeElements}
      </section>
    )
  }

  return (
    <div className='mt-6 px-4'>
      <h2 className="inline-flex items-center rounded-full px-4 mb-6 py-1 text-pink-600 ring-1 ring-inset ring-pink-600" >
        <span className="font-mono text-sm" aria-hidden="true">02</span>
        <span className="ml-3 h-3.5 w-px bg-pink-600/20"></span>
        <span className="ml-3 text-base font-base tracking-tight">Recipes</span>
      </h2>
      <h2 className='text-2xl font-medium tracking-tight'>All Creator's Recipes</h2>
      <div>
        <React.Suspense fallback={<h2>Loading your recipes...</h2>}>
          <Await resolve={dataPromise.createRecipes}>
            {renderCreateRecipes}
          </Await>
        </React.Suspense>
      </div>
    </div>
  )
}