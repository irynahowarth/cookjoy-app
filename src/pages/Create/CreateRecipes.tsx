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
    <div>
      <h2>All Creator's Recipes</h2>
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