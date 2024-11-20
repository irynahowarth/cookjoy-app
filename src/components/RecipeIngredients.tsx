import React from 'react'

type Props = {
    ingredients: Array<{
        name: string,
        amount: string,
        unit: string
    }>
}


export default function RecipeIngredients({ingredients}: Props) {
  return (<>
    <h3 className='mb-6 mt-12 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0'>Ingredients</h3>
    <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
    {ingredients.map((ingredient, index) => (
        <li className='my-2 pl-2' key={index}>
           {ingredient.amount} {ingredient.unit} {ingredient.name} 
        </li>
    ))}
    </ul>
    </>
  )
}