import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import {getRecipes} from '../api'

type Props = {}

export function loader({params}){
  return getRecipes(params.id)
}

export default function RecipeDetail({}: Props) {
  const recipe = useLoaderData();
  return (
    <main className='mt-16 px-6 lg:px-8'>
      <div className="mx-auto max-w-2xl lg:max-w-7xl px-4 sm:px-6">
        {
        recipe ? (
          <div>
            <p className="mt-16 font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500">Monday, October 14, 2024</p>
            <h2 className='mt-2 text-pretty text-4xl font-medium tracking-tighter text-gray-950 sm:text-6xl'>{recipe.title}</h2>
            <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
              <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User Profile Image" className="aspect-square size-6 rounded-full object-cover" />
                  <div className="text-sm/5 text-gray-700">Ania Heist</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href=""
                    className='rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500'
                  >Dinner</a>
                  <a href=""
                    className='rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500'
                  >Lunch</a>
                </div>
              </div>
              <div className="text-gray-700">
                <div className="max-w-2xl xl:mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1657313938000-23c4322dbe22?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Recipe photo" 
                    className='mb-10 aspect-[3/2] w-full rounded-2xl object-cover shadow-xl'
                    />
                  <p>This delicious Peach Strudel is wrapped in puff pastry with a cream cheese and peach filling. Topped with toasted almonds and sprinkled with a little bit of icing sugar, this peach strudel is absolutely perfect for summer! </p>
                  <h3 className='mb-6 mt-12 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0'>Ingredients</h3>
                  <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
                    <li className='my-2 pl-2'>
                    225 grams cream cheese
                    </li>
                    <li className='my-2 pl-2'>
                    1 teaspoon vanilla extract
                    </li>
                    <li className='my-2 pl-2'>
                    ¼ cup sugar
                    </li>
                    <li className='my-2 pl-2'>
                      vanilla extract - 1tsp
                    </li>
                    <li className='my-2 pl-2'>
                    1 egg yolk
                    </li>
                    <li className='my-2 pl-2'>
                    2 sheets puff pastry
                    </li>
                    <li className='my-2 pl-2'>
                    1 egg (for egg wash)
                    </li>
                    <li className='my-2 pl-2'>
                    3 large peaches
                    </li>

                  </ul>
                  <h3 className='mb-6 mt-12 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0'>How to make it</h3>
                  <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                    <li className="my-2 pl-2">
                    Preheat the oven to 375°F.
                    </li>
                    <li className="my-2 pl-2">
                    Prepare the peach filling first by adding the peaches and ¼ cup of sugar to a smaller pot and cook over medium heat for about 3 to 5 minutes just until all the sugar dissolves and the peaches soften a bit. Remove from heat and strain if there is too much liquid. 
                    </li>
                    <li className="my-2 pl-2">
                    In the bowl of your mixer add the cream cheese and mix until smooth. Add the sugar, vanilla extract, egg yolk to the cream cheese and continue mixing until well combined and smooth. 
                    </li>
                    <li className="my-2 pl-2">
                    Using one puff pastry at a time, place it over a lightly floured surface and roll it out into a 14×12 inch rectangle. Cut slits 1 inch apart from the 2 sides of the puff pastry about ⅓ way in, as seen in the pictures. Spoon about half the cream cheese mixture down the center of the pastry and smooth it out.
                    </li>
                    <li className="my-2 pl-2">
                    Next add half the peaches over the cream cheese mixture. Starting at one end, fold the pastry strips over the peach mixture, alternating sides until you completely cover the peach mixture. Repeat with remaining puff pastry and ingredients.
                    </li>
                  </ol>
                </div>
            <div className="mt-12">
                <a href="/recipes" className="inline-flex items-center justify-center px-2 py-1 rounded-lg border border-transparent shadow ring-1 ring-black/10 whitespace-nowrap text-sm font-medium text-gray-950 disabled:bg-transparent hover:bg-gray-50 disabled:opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" className="size-4"><path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd"></path></svg>
                Back to recipes</a>
            </div>
              </div>
            </div>
          </div>
        ) : <h2>Recipe is loading...</h2>}
      </div>
    </main>
  )
}