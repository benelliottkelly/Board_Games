import { useState } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import { LoginProvider } from './components/LoginContext'
import Footer from './components/Footer'

function App() {

  // const [ loggedIn, setLoggedIn ] = useState('loggedOut')
  const navigation = useNavigation()

  return (
    <>
      <LoginProvider>
        <Navbar />
        <main>
          {
            navigation.state === 'idle' ?
              <Outlet />
              :
              <LoadingScreen />
          }
        </main>
        <Footer />
      </LoginProvider>
    </>
  )
}

export default App
