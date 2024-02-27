import { React } from 'react'
import { useLoaderData, Form, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loginOrProfile } from '../utils/helpers/common'
import Select from 'react-select'
import ImageUploadField from './ImageUploadField'
import { editBoardGame } from '../utils/actions/boardgame'

export default function EditBoardGame() {

  const loadedData = useLoaderData()
  const { boardGame, genres } = loadedData
  const { created_by, date_added, description, genre, id, image, owned_by, publisher, reviews, title, year } = boardGame
  
  const navigate = useNavigate()

  // State
  const [formData, setFormData] = useState({
  })
  const [userPK, setUserPK] = useState()
  const [res, setRes] = useState(0)


  // Functions
  function scrollUp() {
    document.documentElement.scrollTop = 0
  }
  scrollUp()

  useEffect(() => {
    const userMatch = loginOrProfile()
    setUserPK(userMatch)
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await editBoardGame(formData, id)
      setRes(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (res?.status === 200) {
      navigate(`/boardgames/${id}/`)
    }
  }, [res])

  return (
    <section className='page-container'>
      <h1 id='editing-title'>Editing {title}...</h1>
      {userPK === created_by.pk
        ?
        <section className='form-page'>
          <section className='form-container'>
            <Form onSubmit={handleSubmit} className='form' method='PATCH'>
              <input type='hidden' name='created_by' value={created_by.pk} />
              <input type="text" name="title" placeholder='Title' onChange={handleChange} value={formData.title} />
              <input type="number" min='100' name="year" placeholder='Year published' onChange={handleChange} value={formData.year} />
              <input type="text" name="publisher" placeholder='Publisher' onChange={handleChange} value={formData.publisher} />
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
              <textarea type="text-area" name='description' placeholder='Description' value={formData.image} />
              <button className='btn form-button' type="submit" >Confirm Changes</button>
              {res?.status > 300 && <p className='danger'>{res.status}: {res.statusText}</p>}
            </Form>
          </section>
          <aside className='secondary-game-display'>
            <section className='show-game-container'>
              <h1>{title}</h1>
              <img className='large-game-image' src={image} />
            </section>
          </aside>
        </section>
        :
        <Link to={`/login/`}>Login to add a new board game</Link>
      }
    </section>
  )
}