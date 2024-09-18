import React from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom';

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

  },[params.id]);
  
  if (!currentRecipe) {
    return <h2>Recipe is loading...</h2>
  }
  
  return (
    <div>
        <div>
          <h2>{currentRecipe.title}</h2>
          <img src={currentRecipe.image} width={150} />
        </div>
        <nav>
          <NavLink to="." end>Info</NavLink>
          <NavLink to="photos">Photos</NavLink>
          <NavLink to="notes">Notes</NavLink>
        </nav>
      <Outlet context={currentRecipe}/>
    </div>
  )
}