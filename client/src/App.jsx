import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <header>
        <a href='#'>Home</a>
        <nav><h3>Nav</h3></nav>
        <div className='login'>
          <h3>Login</h3>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
