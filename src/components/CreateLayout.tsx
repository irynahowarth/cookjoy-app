import React from 'react'
import { Link, Outlet } from 'react-router-dom'

type Props = {}

export default function CreateLayout({}: Props) {
  return (
   <>
    <nav>
      <Link to=".">Dashboard</Link>
      <Link to="./recipes">Recipes</Link>
      <Link to="./reviews">Reviews</Link>
      </nav>
    <Outlet/>
   </>
  )
}