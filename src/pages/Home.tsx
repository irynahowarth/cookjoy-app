import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function Home({}: Props) {
  return (
    <>
        <div>
            <h2>Find Joy in Every Recipe</h2>
            <p>Discover new favorites, explore creative dishes, and turn everyday cooking into moments of happiness.</p>
        </div>
        <div>
           <Link to='/recipes'>Find your best recipe</Link>
        </div>
    </>
  )
}