import { React } from 'react'
import { useActionData, useLoaderData, Form, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loginOrProfile } from '../utils/helpers/common'
import Select from 'react-select'
import ImageUploadField from './ImageUploadField'
import { editBoardGame } from '../utils/actions/boardgame'

export default function EditBoardGame() {

  const loadedData = useLoaderData()
  // const res = useActionData()
  const navigate = useNavigate()

  const { boardGame, genres } = loadedData
  const { created_by, date_added, description, genre, id, image, owned_by, publisher, reviews, title, year } = boardGame

  // State
  const [ userPK, setUserPK ] = useState()
  const [ res , setRes ] = useState()

  const [ formData, setFormData ] = useState({
  })

  // Functions
  useEffect(() => {
    const userMatch = loginOrProfile()
    setUserPK(userMatch)
  }, [])

  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log('formData -> ', formData)
  }

  function handleArrayChange(e){
    let arr = []
    e.forEach((item) => {
      arr.push(item.value)
    })
    setFormData({ ...formData, genre: arr })
  }

  function handleSubmit(e){
    console.log('handlesubmit', formData)
    e.preventDefault()
    const res = editBoardGame(formData, id)
    console.log(res)
    setRes(res)
  }

  useEffect(() => {
    console.log('res ->', res)
    if(res?.status === 201) {
      navigate(`/boardgames/${id}/`)
    }
  }, [res, navigate])

  return (
    <>
      <h1>Edit {title}</h1>
      { userPK === created_by.pk
        ?
        <Form onSubmit={handleSubmit} className='form' id='register-form' method='PATCH'>
          <input type='hidden' name='created_by' value={created_by.pk}/>
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
          <input type='hidden' name='genre' value={formData.genre}/>
          <ImageUploadField setFormData={setFormData} formData={formData}/> 
          <input type='hidden' name='image' value={formData.image}/>
          <input type="text" name='description' placeholder='Description' value={formData.image}/>
          <button type="submit" >Confirm Changes</button>
          {res && <p className='danger'>{res.status}: {res.statusText}</p>}
        </Form>
        :
        <Link to={`/login/`}>Login to add a new board game</Link>
      }
    </>
  )
}