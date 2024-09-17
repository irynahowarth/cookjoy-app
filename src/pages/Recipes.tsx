import React from 'react'
import { Link } from 'react-router-dom';

type Props = {}


export default function Recipes({}: Props) {
  const [recipes, setRecipes] = React.useState([]);
  React.useEffect(()=>{
    const fetchData = async() => {
      const data = await fetch('api/recipes');
      const json = await data.json();
      setRecipes(json.recipes)
    };

    fetchData()
      .catch(console.error);

  },[])
 

  const recipeElements = recipes.map((rec:RecipeProps) => (
    <Link 
      to={`/recipes/${rec.id}`} 
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
        {recipeElements}
      </div>
    </div>
  )
}