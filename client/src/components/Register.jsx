import { useEffect, useState } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import ImageUploadField from './ImageUploadField'

export default function Register() {
  // Loaders
  const res = useActionData()
  const navigate = useNavigate()

  // States
  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    image: null,
    bio: ''
  })

  // Functions
  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    console.log('res ->', res)
    if(res?.status === 201) {
      navigate('/login/')
    }
  }, [res, navigate])

  return (
    <>
      <h1>Register</h1>
      <Form className='form' id='register-form' method='POST'>
        <input type="text" name="username" placeholder='Username' required onChange={handleChange} value={formData.username} />
        <input type="email" name="email" placeholder='email' required onChange={handleChange} value={formData.email} />
        <input type="password" name="password" placeholder='New Password' required onChange={handleChange} value={formData.password} />
        <input type="password" name="password_confirmation" placeholder='Password Confirmation' required onChange={handleChange} value={formData.password_confirmation} />
        <ImageUploadField setFormData={setFormData} formData={formData}/> {/* This line needs to change the hidden line below */}
        <input type='hidden' name='image' value={formData.image ? formData.image : 'https://res.cloudinary.com/dqk3feale/image/upload/v1705318511/board-games/meeple_cblty1.jpg'}/>
        <input type="text" name='bio' placeholder='Bio' onChange={handleChange} value={formData.bio} />
        <button type="submit">Register</button>
        {res && <p className='danger'>{res.status}: {res.statusText}</p>}
      </Form>
    </>
  )
}