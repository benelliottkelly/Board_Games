import { useEffect, useState } from "react"
import { Slide } from 'react-slideshow-image'
import { boardGamesLoader } from "../utils/loaders"
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export default function Slider() {


  // States
  const [boardGames, setBoardGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const res = await boardGamesLoader()
      console.log(res)
      const { boardgames, genres } = res
      setBoardGames(boardgames)
      setIsLoading(false)
    }
    getData()
  }, [])


  return (
    <>
      {isLoading ? (
        <div id='loading-slide' className='slide-container'>
          <article className='loading-container'>
            <div className='loading-title'>
              <h2>Loading the Library<span className='loading-dots' id='dot-1'>.</span><span className='loading-dots' id='dot-2'>.</span><span className='loading-dots' id='dot-3'>.</span></h2>
              <div>
                <div className="dot-flashing"></div>
              </div>
            </div>
          </article>
        </div>
      ) : (
        <div id='loaded-slide' className='slide-container'>
          <Slide>
            {boardGames.length > 0 && boardGames.map((game) => {
              return <Link className='slide-game-link' key={uuidv4} to={`/boardgames/${game.id}`}>
                <div className='slide-image' style={{ backgroundImage: `url('${game.image}')` }}>
                </div>
                <div className='slide-title'>{game.title}</div>
              </Link>
            })}
          </Slide>
        </div>
      )}
    </>
  )
}