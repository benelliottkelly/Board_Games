import { useEffect, useState } from "react"
import { loginOrProfile, removeToken } from "../utils/helpers/common"
import { singleUserLoader } from "../utils/loaders"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react'
import { loginContext } from './LoginContext'


export default function NavProfile(){
  
  // States
  const { loggedIn, setLoggedIn } = useContext(loginContext)
  const [ userPK, setUserPK ] = useState()
  const [ profileData, setProfileData ] = useState()

  const navigate = useNavigate()
  
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
    navigate(`/login/`)
  }

  function testFunction(){
    console.log('Hello')
  }

  return(
    <>
      { loggedIn === true && profileData ? <div className="nav-profile">
        <Link className='nav-picture-links' to={`/users/${profileData.pk}/`}><img src={profileData.image} alt={`${profileData.username}'s profile picture`} /></Link>
        <button type="button" className="btn btn-danger" onClick={logOut}>Logout</button>
      </div>
      :
      <div className="nav-profile">
        <Link to='/register/'><button type="button" className="btn btn-warning">Register</button></Link>
        <Link to='/login/'><button type="button" className="btn btn-info" >Login</button></Link>
      </div>
      }
    </>
  )
}