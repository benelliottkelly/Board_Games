import { useLoaderData } from "react-router-dom"

export default function AllBoardGames() {

  const loadedData = useLoaderData()
  
  loadedData.forEach(boardgame => {
    console.log(boardgame)
  })
  

  return (
    <>
      <h1>Board Game Library</h1>
    </>
  )
}