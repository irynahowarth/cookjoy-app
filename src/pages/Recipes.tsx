
import React from 'react'
import { Link, useSearchParams, useLoaderData,defer, Await } from 'react-router-dom';
import { getRecipes } from '../api';

type Props = {}

const allDishTypes = ["breakfast","lunch", "dinner", "snack", "dessert"]

export function loader(){
  return defer({recipes: getRecipes()});
}


export default function Recipes({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const dataPromise = useLoaderData()

  const typeFilter = searchParams.get("type")

  
  
  function renderRecipes(recipes){
    const displayRecipes = typeFilter 
      ? recipes.filter(rec => rec.dishTypes.includes(typeFilter.toLowerCase()))
      : recipes
  
    const recipeElements = displayRecipes?.map((rec:RecipeProps) => (
      <Link 
        to={rec.id} 
        key={rec.id}
        aria-label={`View details for ${rec.title}`}
      >
        <div><p>{rec.title}</p></div>
      </Link>
    ))

    return (
      <>
        <div>
            {allDishTypes.map((el,index) =>
            <button 
                key={el+index}
                onClick={()=>setSearchParams({type:el})}  
              >
                  {el}
              </button>
              )}
            <button key="clear" onClick={()=>setSearchParams({})}>clear</button>

        </div>
        <div>
          {recipeElements}
        </div>
      </>
    )

  }

  return (
    <div>
      <h2>All our Recipes</h2>
      <React.Suspense fallback={<h2>Loading all recipes</h2>}>
        <Await resolve={dataPromise.recipes}>
          {renderRecipes}
        </Await>
      </React.Suspense>
    </div>
  )
}