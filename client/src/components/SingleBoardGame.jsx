import { useEffect, useState } from 'react'
import { Link, useLoaderData } from "react-router-dom"
import { loginOrProfile } from '../utils/helpers/common'
import { LiaStarSolid } from "react-icons/lia"
import Button from 'react-bootstrap/esm/Button'

export default function SingleBoardGame() {
  const loadedData = useLoaderData()
  const { boardGame, Genres } = loadedData
  console.log(boardGame)
  const {created_by, date_added, description, genre, id, image, owned_by, publisher, reviews, title, year } = boardGame
  
  // States
  const [ userPK, setUserPK ] = useState()

  // Functions
  function calculateStars(rating){
    let stars = ''
    for (let i = 0; i < rating; i++) {
      stars = `${<LiaStarSolid />}` + stars
    }
    console.log(stars)
    return stars
  }

  useEffect(() => {
    const userMatch = loginOrProfile()
    setUserPK(userMatch)
  }, [])

  return (
    <>
      { userPK === created_by.pk &&
        <>
          <Link to={`/boardgames/${id}/edit/`}><Button>Edit</Button></Link>
          <Button>Delete</Button>
        </>
      }
      <h1>{title}</h1>
      <h3>{year}</h3>
      <h3>Publisher: {publisher}</h3>
      { genre.length > 0 && <ul>
        {genre.map((obj, idx) => {return <li key={idx}>{obj.name}</li>})}
      </ul>
      }
      <img src={image}/>
      <p>{description}</p>
      { reviews.length > 0 ? 
      reviews.map((review, idx) => {
        return <div key={idx}>
          <h2>{review.title}</h2>
          <h3>{calculateStars(review.rating)}</h3>
          <p>{review.text}</p>
          </div>
      })
      :
      <div>
        <h3>No reviews have been left for {title} yet</h3>
      </div>
      }
    </>
  )
}