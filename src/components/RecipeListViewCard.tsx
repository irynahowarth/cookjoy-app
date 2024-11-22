import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Props = {}

export default function RecipeListViewCard({recipe}: Props) {
   const navigate = useNavigate();
   const btnStyles='z-0 px-4 py-1 rounded-lg border border-transparent shadow ring-1 ring-black/10 whitespace-nowrap text-sm font-medium text-gray-950 disabled:bg-transparent hover:bg-gray-50 disabled:opacity-40'
  return (
    <li className='relative flex justify-between gap-x-6 py-5'>
        <div className="flex min-w-o gap-x-4">
            <img className="size-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1657313938000-23c4322dbe22?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div className="min-w-0 flex-auto">
                <Link to={recipe.id}  aria-label={`View details for ${recipe.title}`}>
                    <span className="absolute inset-0"></span>
                    {recipe.title}
                </Link>
                <p className="mt-1 text-sm/5 text-gray-500">{recipe.description}</p>
            </div>
        </div>

        <div className="flex shrink-0 gap-x-4 sm:items-end">
            <button className={btnStyles} onClick={()=> navigate(`${recipe.id}/edit`)}>Edit</button>
            <button className={btnStyles} onClick={()=>console.log('delite')}>Delete</button>
        </div>
    </li> 
  )
}