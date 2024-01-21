import { useEffect, useState } from "react"
import { Slide } from 'react-slideshow-image'
import { boardGamesLoader } from "../utils/loaders"
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export default function Slider() {


  // States
  const [ boardGames , setBoardGames ] = useState([])
  const [ scroll , setScroll ] = useState([])

  useEffect(() => {
    async function getData() {
      const res = await boardGamesLoader()
      console.log(res)
      const { boardgames , genres } = res
      setBoardGames(boardgames)
    }
    getData()
  }, [])

  useEffect(() => {
    if (boardGames.length > 0) {
      setScroll(true)
    }
  }, [boardGames])
  

  return (
    <>
      <div className='slide-container'>
        <Slide>
          { boardGames.length > 0 && boardGames.map((game) => {
            return <Link className='slide-game-link' key={uuidv4} to={`/boardgames/${game.id}`}>
                <div className='slide-image' style={{backgroundImage: `url('${game.image}')`}}>
                </div>
                  <div className='slide-title'>{game.title}</div>
              </Link>
          })}
          {scroll}
        </Slide>
      </div>
    </>
  )
}