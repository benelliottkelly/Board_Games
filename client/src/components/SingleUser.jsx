import { useEffect, useState } from "react"
import { isUserActiveUser, removeToken } from "../utils/helpers/common"
import { useActionData, useLoaderData } from "react-router-dom"
import { useContext } from 'react'
import { loginContext } from './LoginContext'


export default function SingleUser() {

  const res = useActionData()
  const { loggedIn, setLoggedIn } = useContext(loginContext)

  const loadedData = useLoaderData()
  console.log(loadedData)
  const { pk, image, username, first_name, last_name, email, bio, games, reviews } = loadedData

  // States
  const [ view, setView ] = useState(false)

  // Checks if user is the owner of the page and changes display accordingly
  useEffect(() => {
    const userMatch = isUserActiveUser(pk)
    setView(userMatch)
  }, [view] )


  // Logout button
  function logOut(){
    removeToken()
    setView(false)
  }

  return (
    <>
      <section className="profile-info">
        <h1>Profile: {username}</h1>
        <img className="profile-image-main" src={image}/>
        { {first_name} ? <h4>{first_name} {last_name}</h4> : null}
        { view === true && <h4>{email}</h4> }
        <p>{bio}</p>
      <div>
        <h4>Owned Games:</h4>
        {/* Add in button to add more games */}
        { games.length > 0 ? 
          games.map((obj, idx)=>{
            return <div key={idx}>
              <h4>{obj.game.title} <span>({obj.game.year})</span></h4>
              <img src={obj.game.image}/>
              <h4>Quantity: {obj.quantity}</h4>
            </div>
          })
          :
          <p>{username} has not added any games yet</p>
        }
      </div>
      <div>
        <h4>Reviews Made:</h4>
        { reviews.length > 0 ? 
          reviews.map((review, idx)=>{
            return <div key={idx} className='review-cards' style={{backgroundImage: `url("${review.board_game.image}")`}}>
              <h4>{review.board_game.title} <span>({review.rating}/5)</span></h4>
              <p>{review.title}</p>
            </div>
          })
          :
          <p>{username} has not made any reviews yet</p>
        }
      </div>
      </section>
    </>
  )
}