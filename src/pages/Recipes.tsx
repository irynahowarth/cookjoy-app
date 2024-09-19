import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';

type Props = {}

const allDishTypes = ["breakfast","lunch", "dinner", "snack", "dessert"]

export default function Recipes({}: Props) {
  const [recipes, setRecipes] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type")
  

  React.useEffect(()=>{
    const fetchData = async() => {
      const data = await fetch('api/recipes');
      const json = await data.json();
      setRecipes(json.recipes)
    };

    fetchData()
      .catch(console.error);

  },[])
  
  const displayRecipes = typeFilter 
    ? recipes.filter(rec => rec.dishTypes.includes(typeFilter.toLowerCase()))
    : recipes

  const recipeElements = displayRecipes.map((rec:RecipeProps) => (
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