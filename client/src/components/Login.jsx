import { useEffect, useState } from "react"
import { Form, useActionData, useNavigate } from "react-router-dom"
import { setToken } from "../utils/helpers/common"
import { useContext } from 'react'
import { loginContext } from './LoginContext'
import logo from '../assets/images/logo.jpeg'

export default function Login() {
  const res = useActionData()
  const navigate = useNavigate()

  // State 
  // const [res, setRes] = useState()
  const { loggedIn, setLoggedIn } = useContext(loginContext)

  // Functions
  function scrollUp() {
    document.documentElement.scrollTop = 0
  }
  scrollUp()

  useEffect(() => {
    if (res?.status === 200) {
      console.log(res)
      setToken(res.data.access)
      setLoggedIn(true)
      navigate('/')
    }
  }, [res])

  return (
    <section className='form-page'>
      <section className="form-container">
        <h1>Login</h1>
        <Form className='form' id='login-form' method='POST'>
          <input type="username" name="username" placeholder='Username' />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit" className="btn form-button">Login</button>
          {res && <p className='danger'>{res.data.message}</p>}
        </Form>
      </section>
      <aside className="large-logo-container">
        <img className='large-logo' src={logo} />
      </aside>
    </section>
  )
}