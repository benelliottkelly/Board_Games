import { useEffect, useState } from "react"
import { loginOrProfile, removeToken } from "../utils/helpers/common"
import { singleUserLoader } from "../utils/loaders"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react'
import { loginContext } from './LoginContext'


export default function NavProfile(){

  const navigate = useNavigate()
  const { loggedIn, setLoggedIn } = useContext(loginContext)

  // States
  const [ navView, setNavView ] = useState(0)
  const [ profileData, setProfileData ] = useState(0)
  
  // Check if user is logged in and match user to profile
  useEffect(() => {
    const userMatch = loginOrProfile()
    setNavView(userMatch)
    console.log('User Match', userMatch)
  }, [loggedIn])

  useEffect(() => {
    const fetchData = async () => {
      try {

          const profile = await singleUserLoader(navView)
          console.log(profile)
          setProfileData(profile)
          

      } catch (error) {
        console.log(error)
      }
      console.log('Profile data -> ', profileData)
      console.log('Profile data > 0? -> ', profileData > 0)
    }
    fetchData()
  }, [ navView, loggedIn ])

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
      { loggedIn === true && profileData.pk > 0 ? <div>
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