import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { getRecipes } from '../api';

type Props = {}

const allDishTypes = ["breakfast","lunch", "dinner", "snack", "dessert"]

export default function Recipes({}: Props) {
  const [recipes, setRecipes] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const typeFilter = searchParams.get("type")
  

  React.useEffect(()=>{
    setLoading(true)
   
    const fetchData = async() => {
      try {
        const data = await getRecipes()
        setRecipes(data)
      } catch(err){
        setError(err)
      } finally{
        setLoading(false)
      }
    };

    fetchData();


  },[])

  if(loading){
    return <h2 aria-live="polite">Loading...</h2>
  }

  if(error){
    return <h2 aria-live="assertive">There was an error:{error.message} </h2>
  }

  
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