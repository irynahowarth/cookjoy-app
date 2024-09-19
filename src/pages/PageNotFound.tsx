import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function PageNotFound({}: Props) {
  return (
    <div>
        <h1>404</h1>
        <h2>Sorry no page found</h2>
        <Link to="/">Back to Home</Link>
    </div>
  )
}