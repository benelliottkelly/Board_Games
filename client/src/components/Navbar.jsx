import NavProfile from './NavProfile'
import { useContext } from 'react'
import { loginContext } from './LoginContext'
import { Link } from 'react-router-dom'

export default function Navbar() {

  const { loggedIn, setLoggedIn } = useContext(loginContext)


  return (
    <header>
      <div className="nav-profile">
        <img src='../src/assets/images/logo.jpeg' />
        <Link to={`/`}><button type="button" className="btn btn-info">Home</button></Link>
        <Link to={`/boardgames/`}><button type="button" className="btn btn-info">Board Game Library</button></Link>
      </div>
      <NavProfile />
    </header>
  )
}