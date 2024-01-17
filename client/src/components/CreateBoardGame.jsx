import { useEffect, useState } from 'react'
import { loginOrProfile } from '../utils/helpers/common'
import { Form, Link, useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import ImageUploadField from './ImageUploadField'
import { genresLoader } from '../utils/loaders'
import { v4 as uuidv4 } from 'uuid'

export default function CreateBoardGame() {
  // Loaders
  const loadedData = useLoaderData()
  const res = useActionData()
  const navigate = useNavigate()

  const { boardgames, genres } = loadedData

  // States
  const [ formData, setFormData ] = useState({
    created_by: '',
    title: '',
    year: '',
    publisher: '',
    genre: [],
    image: null,
    description: ''
  })

  const [ userPK, setUserPK ] = useState()

  // Functions
  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleArrayChange(e){
    const value = e.target.value
    const foundIndex = formData.genre.indexOf(value)

    if (foundIndex !== -1) {
      const updatedGenre = formData.genre.slice()
      updatedGenre.splice(foundIndex, 1)
      setFormData({ ...formData, genre: updatedGenre })
    } else {
      setFormData({ ...formData, genre: [...formData.genre, value] })
    } 
  }

  useEffect(() => {
    const userMatch = loginOrProfile()
    setUserPK(userMatch)
  }, [])

  useEffect(() => {
    setFormData({ ...formData, created_by: userPK})
  }, [userPK])

  return (
    <>
      { userPK
        ?
        <Form className='form' id='register-form' method='POST'>
          <input type='hidden' name='created_by' value={formData.created_by}/>
          <input type="text" name="title" placeholder='Title' required onChange={handleChange} value={formData.title} />
          <input type="number" min='100' name="year" placeholder='Year published' required onChange={handleChange} value={formData.year} />
          <input type="text" name="publisher" placeholder='Publisher' required onChange={handleChange} value={formData.publisher} />
          <select defaultValue={[]} value={formData.genre} name='genre-select' required multiple={true}>
            <option value='genre' disabled selected>Genre</option>
            {genres.length > 0 &&
            genres.map((genre) => {
              return <option key={uuidv4()} onClick={handleArrayChange} value={[genre.id]}>{(genre.name).charAt(0).toUpperCase() + (genre.name).slice(1).toLowerCase()}</option>
            })
            }
          </select>
          <input type='hidden' name='genre' value={formData.genre}/>
          <ImageUploadField setFormData={setFormData} formData={formData}/> 
          <input type='hidden' name='image' value={formData.image}/>
          <input type="text" name='description' placeholder='Description' onChange={handleChange} value={formData.description} />
          <button type="submit">Add Game</button>
          {res && <p className='danger'>{res.status}: {res.statusText}</p>}
        </Form>
        :
        <Link to={`/login/`}>Login to add a new board game</Link>
      }
    </>
  )
}