import React from 'react'
import { useRouteError } from 'react-router-dom'

type Props = {}

export default function Error({}: Props) {
  const error = useRouteError()
  return (
    <div><b>Error:</b> {error.message}</div>
  )
}