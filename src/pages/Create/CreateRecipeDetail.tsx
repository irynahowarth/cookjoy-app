import React from 'react'
import { useParams } from 'react-router-dom';

type Props = {}

export default function CreateRecipeDetail({}: Props) {
  const params = useParams();
  const [currentRecipe, setCurrentRecipe] = React.useState(null)
  React.useEffect(()=>{
    const fetchData = async() => {
      const data = await fetch(`/api/create/recipes/${params.id}`);
      const json = await data.json();
      setCurrentRecipe(json.recipes)
    };

    fetchData()
      .catch(console.error);

  },[params.id])   
  return (
    <div>
      {
      currentRecipe ? (
        <div>
          <h2>{currentRecipe.title}</h2>
          <img src={currentRecipe.image} width={150} />
          
        </div>
      ) : <h2>Recipe is loading...</h2>}
    </div>
  )
}