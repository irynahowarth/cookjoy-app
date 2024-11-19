
import React from 'react'
import { Link, useSearchParams, useLoaderData,defer, Await } from 'react-router-dom';
import { getRecipes, getDishTypes } from '../api';
import useDishTypes from '../context/useDishTypes';
import RecipeListCard from '../components/RecipeListCard';


type Props = {}

export function loader(){
  return defer({recipes: getRecipes()});
}


export default function Recipes({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dishTypes, loading } = useDishTypes();

  const dataPromise = useLoaderData()

  if (loading) {
    return <p>Loading dish types...</p>;
  }
    
  const allDishTypes= dishTypes.map(el=>el?.name)
  const typeFilter = searchParams.get("type")

  const btnStyle = ' px-4 py-1 rounded-lg border border-transparent shadow ring-1 ring-black/10 whitespace-nowrap text-sm font-medium text-gray-950 disabled:bg-transparent hover:bg-gray-50 disabled:opacity-40'
  
  function renderRecipes(recipes){
    const displayRecipes = typeFilter 
      ? recipes.filter(rec => rec.dishTypes.includes(typeFilter.toLowerCase()))
      : recipes
  
    const recipeElements = displayRecipes?.map((rec:RecipeProps) => (
        <RecipeListCard recipe={rec} key={rec.id}/>
    ))

    return (
      <>
        <hr className="mt-6 border-t border-gray-200"></hr>
        <div className='flex flex-wrap gap-3 mt-6'>
            {allDishTypes.map((el,index) =>
            <button
                className={btnStyle}
                key={el+index}
                onClick={()=>setSearchParams({type:el})}  
              >
                  {el[0].toUpperCase()+el.slice(1)}
              </button>
              )}
            <button 
            className={btnStyle}
            key="clear" onClick={()=>setSearchParams({})}>Clear All</button>

        </div>
        <hr className="mt-6 border-t border-gray-200"></hr>
        <div className='mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {recipeElements}
        </div>
      </>
    )

  }

  return (
    <main className='mt-16 px-6 lg:px-8'>
      <div className="mx-auto max-w-2xl lg:max-w-7xl px-4 sm:px-6">
        <h2 className='mt-2 text-pretty text-4xl font-medium tracking-tighter text-gray-950 sm:text-6xl'>All our Recipes</h2>
        <React.Suspense fallback={<h2>Loading all recipes</h2>}>
          <Await resolve={dataPromise.recipes}>
            {renderRecipes}
          </Await>
        </React.Suspense>
      </div>
    </main>
  )
}