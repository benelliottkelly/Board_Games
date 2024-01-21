import { useEffect, useState } from "react"
import { isUserActiveUser, removeToken } from "../utils/helpers/common"
import { useActionData, useLoaderData, Link } from "react-router-dom"
import { useContext } from 'react'
import { loginContext } from './LoginContext'
import { v4 as uuidv4 } from 'uuid'


export default function SingleUser() {

  const res = useActionData()
  const { loggedIn, setLoggedIn } = useContext(loginContext)

  const loadedData = useLoaderData()
  console.log(loadedData)
  const { pk, image, username, first_name, last_name, email, bio, games, reviews } = loadedData

  // States
  const [view, setView] = useState(false)

  // Functions
  function scrollUp() {
    document.documentElement.scrollTop = 0
  }
  scrollUp()
  

  // Checks if user is the owner of the page and changes display accordingly
  useEffect(() => {
    const userMatch = isUserActiveUser(pk)
    setView(userMatch)
  }, [view, loggedIn, loadedData])

  return (
    <>
      <section className="profile-info">
            <h1>Profile: {username}</h1>
        <div className="information-container">
          <div className='name-and-image'>
            <img className="profile-image-main" src={image} />
            {{ first_name } ? <h4>{first_name} {last_name}</h4> : null}
            {view === true && <h4 className="special-characters">{email}</h4>}
          </div>
          <p className="special-characters bio">{bio}</p>
        </div>
        <article className="owned-games-container">
          <h3>Owned Games:</h3>
          <div className="carousel">
            {/* Add in button to add more games */}
            {games.length > 0 ?
              games.map((obj) => {
                return <div key={uuidv4()} className="details-container">
                  <h4>{obj.game.title} <span className="special-characters">({obj.game.year})</span></h4>
                  <Link to={`/boardgames/${obj.game.id}`} ><img src={obj.game.image} /></Link>
                  <h4>Quantity: {obj.quantity}</h4>
                </div>
              })
              :
              <p>{username} has not added any games yet</p>
            }
          </div>
        </article>
        <article className='reviews-made-container'>
          <h3>Reviews Made:</h3>
          <div className='carousel'>
            {reviews.length > 0 ?
              reviews.map((review) => {
                return <div key={uuidv4()} className='details-container' style={{ backgroundImage: `url("${review.board_game.image}")` }}>
                  <h4>{review.board_game.title} <span>({review.rating}/5)</span></h4>
                  <p>{review.title}</p>
                </div>
              })
              :
              <p>{username} has not made any reviews yet</p>
            }
          </div>
        </article>
      </section>
    </>
  )
}