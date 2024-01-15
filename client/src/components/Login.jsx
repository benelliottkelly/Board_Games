import { useEffect } from "react"
import { Form, useActionData, useNavigate } from "react-router-dom"
import { setToken } from "../utils/helpers/common"

export default function Login() {
  const res = useActionData()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(res)
    if(res?.status === 200) {
      console.log(res)
      setToken(res.data.access)
      navigate('/')
    }
  }, [res, navigate])

  return (
    <>
      <h1>Login</h1>
      <Form className='form' id='login-form' method='POST'>
        <input type="username" name="username" placeholder='Username' />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
        {res && <p className='danger'>{res.data.message}</p>}
      </Form>
    </>
  )
}