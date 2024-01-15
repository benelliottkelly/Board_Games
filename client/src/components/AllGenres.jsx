import { useLoaderData } from "react-router-dom"

export default function AllGenres() {
  
  const genres = useLoaderData()
  console.log(genres)

  return (
    <>
      <h1>Genres</h1>
    </>
  )
}