import React from 'react'

type Props = {
    instructions: Array<string>
}

export default function RecipeInstructions({instructions}: Props) {
  return (
    <>
        <h3 className='mb-6 mt-12 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0'>How to make it</h3>
        <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
        {instructions.map((step,index)=>(
            <li className="my-2 pl-2" key={index}>{step}</li>
        ))}
        </ol>
    </>
  )
}