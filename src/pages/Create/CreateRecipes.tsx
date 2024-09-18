import React from 'react'
import { Link } from 'react-router-dom';

type Props = {}

export default function CreateRecipes({}: Props) {
  const [recipes, setRecipes] = React.useState([]);
  React.useEffect(()=>{
    const fetchData = async() => {
      const data = await fetch('/api/create/recipes');
      const json = await data.json();
      setRecipes(json.recipes)
    };

    fetchData()
      .catch(console.error);

  },[])
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
    <div>
      <h2>All Creator's Recipes</h2>
      <div>
        {recipes.length >0 ? (
          <section>
          {recipeElements}
          </section>
        ) : (  <h2>Loading...</h2>)}
      </div>
    </div>
  )
}