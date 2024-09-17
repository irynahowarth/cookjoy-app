import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

export default function RecipeDetail({}: Props) {
  const params = useParams();
  const [recipe, setRecipe] = React.useState(null)
  React.useEffect(()=>{
    const fetchData = async() => {
      const data = await fetch(`/api/recipes/${params.id}`);
      const json = await data.json();
      setRecipe(json.recipes)
    };

    fetchData()
      .catch(console.error);

  },[params.id])
  return (
    <div>
      {recipe? (
        <div>
          <h2>{recipe.title}</h2>
        </div>
      ) : <h2>Recipe is loading...</h2>}
    </div>
  )
}