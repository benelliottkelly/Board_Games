import NavProfile from './NavProfile'
import { useContext } from 'react'
import { loginContext } from './LoginContext'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.jpeg'
import library from '../assets/images/library.png'

export default function Navbar() {

  const { loggedIn, setLoggedIn } = useContext(loginContext)


  return (
    <header>
      <div className="nav-profile">
        <Link className='nav-picture-links' to={`/`}><img src={logo} /></Link>
        <Link className='nav-picture-links' to={`/boardgames/`}><img src={library} /></Link>
        <Link className='button-link-to-hide' to={`/boardgames/`}><button type="button" className="btn btn-info">Board Game Library</button></Link>
      </div>
      <NavProfile />
    </header>
  )
}