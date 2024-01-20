import { useEffect, useState } from 'react'
import { loginOrProfile } from '../utils/helpers/common'
import { Form, Link, useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import ImageUploadField from './ImageUploadField'
import Select from 'react-select'

export default function CreateBoardGame() {
  // Loaders
  const loadedData = useLoaderData()
  const res = useActionData()
  const navigate = useNavigate()

  const { boardgames, genres } = loadedData

  // States
  const [formData, setFormData] = useState({
    created_by: '',
    title: '',
    year: '',
    publisher: '',
    genre: [],
    image: null,
    description: ''
  })

  const [userPK, setUserPK] = useState()

  // Functions
  function scrollUp() {
    document.documentElement.scrollTop = 0
  }
  scrollUp()

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleArrayChange(e) {
    let arr = []
    e.forEach((item) => {
      arr.push(item.value)
    })
    setFormData({ ...formData, genre: arr })
  }

  useEffect(() => {
    const userMatch = loginOrProfile()
    setUserPK(userMatch)
  }, [])

  useEffect(() => {
    setFormData({ ...formData, created_by: userPK })
  }, [userPK])

  return (
    <>
      {userPK
        ?
        <section>
          <section className='form-container'>
            <Form className='form' method='POST'>
              <input type='hidden' name='created_by' value={formData.created_by} />
              <input type="text" name="title" placeholder='Title' required onChange={handleChange} value={formData.title} />
              <input type="number" min='100' name="year" placeholder='Year published' required onChange={handleChange} value={formData.year} />
              <input type="text" name="publisher" placeholder='Publisher' required onChange={handleChange} value={formData.publisher} />
              <Select
                defaultValue={[]}
                isMulti
                name="genre"
                options={genres.length > 0 && genres.map((item) => {
                  return { value: item.id, label: item.name }
                })}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleArrayChange}
              />
              <input type='hidden' name='genre' value={formData.genre} />
              <ImageUploadField setFormData={setFormData} formData={formData} />
              <input type='hidden' name='image' value={formData.image} />
              <textarea type="text-area" rows="5" cols="50" name='description' placeholder='Description' onChange={handleChange} value={formData.description} />
              <button className='btn form-button' type="submit">Add Game</button>
              {res?.status > 399 && <p>{res.status}: {res.statusText}</p>}
            </Form>
          </section>
        </section>
        :
        <Link to={`/login/`}>Login to add a new board game</Link>
      }
    </>
  )
}