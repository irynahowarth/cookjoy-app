
import { Link, useSearchParams, useLoaderData } from 'react-router-dom';
import { getRecipes } from '../api';

type Props = {}

const allDishTypes = ["breakfast","lunch", "dinner", "snack", "dessert"]

export function loader(){
  return getRecipes();
}


export default function Recipes({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const recipes = useLoaderData()

  const typeFilter = searchParams.get("type")

  
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
    <div>
      <h2>All our Recipes</h2>
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
    </div>
  )
}