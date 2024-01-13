import { useLoaderData } from "react-router-dom"

export default function AllBoardGames() {

  const boardGames = useLoaderData()
  console.log(boardGames)

  return (
    <>
      <h1>Board Game Library</h1>
    </>
  )
}