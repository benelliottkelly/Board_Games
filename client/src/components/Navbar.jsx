import NavProfile from './NavProfile'
import { useContext } from 'react'
import { loginContext } from './LoginContext'

export default function Navbar() {

  const { loggedIn, setLoggedIn } = useContext(loginContext)


  return (
    <header>
      <a href='#'>Home</a>
      <nav><h3>Nav</h3></nav>
      <div className='login'>
        <h3>Login</h3>
      </div>
      <NavProfile />
    </header>
  )
}