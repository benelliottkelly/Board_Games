import { useEffect, useState, useRef } from "react"
import { loginOrProfile, removeToken } from "../utils/helpers/common"
import { singleUserLoader } from "../utils/loaders"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react'
import { loginContext } from './LoginContext'


export default function NavProfile(){

  const navigate = useNavigate()
  // const componentIsMounted = useRef(true)
  
  // States
  const { loggedIn, setLoggedIn } = useContext(loginContext)
  const [ navView, setNavView ] = useState()
  const [ profileData, setProfileData ] = useState()
  
  // Check if user is logged in and match user to profile
  useEffect(() => {
    const userMatch = loginOrProfile()
    setNavView(userMatch)
    console.log('User Match', userMatch)
  }, [loggedIn])

  // useEffect(()=> {
  //   return () => {
  //     componentIsMounted.current = false
  //   }
  // }, [])

  useEffect(() => {
    setProfileData(false)
    async function fetchData() {
      try {
          const profile = await singleUserLoader(navView)
          console.log('Profile -> ', profile)
          // if (componentIsMounted.current) {
          setProfileData({profile})
          console.log('Profile data -> ', profileData)
          console.log('Profile data > 0? -> ', profileData.pk > 0)
          // }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [ loggedIn ])

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
      { loggedIn === true ? <div>
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