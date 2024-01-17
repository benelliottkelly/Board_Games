import { useEffect, useState } from "react"
import { loginOrProfile, removeToken } from "../utils/helpers/common"
import { singleUserLoader } from "../utils/loaders"
import { Link } from "react-router-dom"
import { useContext } from 'react'
import { loginContext } from './LoginContext'


export default function NavProfile(){
  
  // States
  const { loggedIn, setLoggedIn } = useContext(loginContext)
  const [ userPK, setUserPK ] = useState()
  const [ profileData, setProfileData ] = useState()
  
  // Check if user is logged in and match user to profile
  useEffect(() => {
    const userMatch = loginOrProfile()
    setUserPK(userMatch)
  }, [ loggedIn ])

  useEffect(() => {
    async function fetchData() {
      if (userPK) {
      try {
          const profile = await singleUserLoader(userPK)
          setProfileData(profile)
      } catch (error) {
        console.log(error)
      }
    }
    }
    fetchData()
  }, [ userPK ])

  // Logout button
  function logOut(){
    removeToken()
    setLoggedIn(false)
    console.log('Logged Out')
  }

  function testFunction(){
    console.log('Hello')
  }

  return(
    <>
      <button onClick={testFunction}>TEST</button>
      { loggedIn === true && profileData ? <div>
        <img src={profileData.image} alt={`${profileData.username}'s profile picture`}/>
        <Link to={`/users/${profileData.pk}/`}>{profileData.username}</Link>
        <button onClick={logOut}>Logout</button>
      </div>
      :
      <div>
        <Link to='/register/'><button>Register</button></Link>
        <Link to='/login/'><button>Login</button></Link>
      </div>
      }
    </>
  )
}