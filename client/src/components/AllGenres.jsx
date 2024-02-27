// This page is not yet in use but may be used in the future for viewing and adding new genres

import { useLoaderData } from "react-router-dom"

export default function AllGenres() {
  
  const genres = useLoaderData()

  return (
    <>
      <h1>Genres</h1>
    </>
  )
}