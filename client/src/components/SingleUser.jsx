import { useEffect, useState } from "react"
import { activeUser, isUserActiveUser, matchingUser, removeToken } from "../utils/helpers/common"
import { useActionData, useLoaderData, useNavigate } from "react-router-dom"
import { getToken } from "../utils/helpers/common"

// Bootstrap components

export default function SingleUser() {

  const res = useActionData()
  const navigate = useNavigate()

  const loadedData = useLoaderData()
  const { user, boardgames, gamesowned, reviews} = loadedData
  console.log(loadedData)
  const { pk, image, username, first_name, last_name, email, bio, games_owned, reviews: user_reviews } = user


  // States
  const [ view, setView ] = useState(false)
  const [ listOfGames, setListOfGames ] = useState([])
  const [ listOfReviews, setListOfReviews ] = useState([])

  // Checks if user is the owner of the page and changes display accordingly
  useEffect(() => {
    const userMatch = isUserActiveUser(pk)
    setView(userMatch)
  }, [view]
  )


  // Logout button
  function logOut(){
    removeToken()
    setView(false)
  }

  // Matches owned games id's with list of games
//   useEffect(() => {
//     const mappedGames = games_owned.map((game, idx) => {
//       console.log('game -> ', game)
//       return boardgames.find((boardgame) => boardgame.id === game)
//     })
//     setListOfGames(mappedGames)
// }, [])

// useEffect(() => {
//   const mappedReviews = user_reviews.map((review, idx) => {
//     console.log('review -> ', review)
//     return reviews.find((review) => user_reviews.id === review)
//   })
//   setListOfReviews(mappedReviews)
// }, [])

  return (
    <>
      { view === true && <button onClick={logOut}>Logout</button> }
      <h1>User: {username}</h1>
      <img src={image}/>
      { {first_name} ? <h4>{first_name} {last_name}</h4> : null}
      { view === true && <h4>{email}</h4> }
      <p>{bio}</p>
      <div>
        <h4>Owned Games:</h4>
        {/* Add in button to add more games */}
        { games_owned.length > 0 ? 
          games_owned.map((game, idx)=>{
            return <div key={idx}>
              <h4>{game.title}<span>({game.year})</span></h4>
              <img src={game.image}/>
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
            console.log(review)
            return <div key={idx}>
              <h4>{review.title} <span>({review.rating}/5)</span></h4>
              {/* <img src={game.image}/> */}
            </div>
          })
          :
          <p>{username} has not made any reviews yet</p>
        }
      </div>
    </>
  )
}