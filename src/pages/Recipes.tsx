import React from 'react'

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
 

  const recipeElements = recipes.map(rec => (
    <div key={rec.id}><h3>{rec.title}</h3></div>
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