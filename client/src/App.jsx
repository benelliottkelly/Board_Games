import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { LoginProvider } from './components/LoginContext'

function App() {

  

  const [ loggedIn, setLoggedIn ] = useState('loggedOut')

  return (
    <>
    <LoginProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </LoginProvider>
    </>
  )
}

export default App
