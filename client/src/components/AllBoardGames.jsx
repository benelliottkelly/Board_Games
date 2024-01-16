import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { createGenre } from '../utils/actions/genres'
import { Form } from 'react-router-dom'

export default function AllBoardGames() {

  // Loaded Data
  const loadedData = useLoaderData()
  console.log(loadedData)
  const { users , boardgames, gamesowned, reviews } = loadedData
  
  // States
  const [ genreFormData, setGenreFormData ] = useState({
    name: '',
  })

  // Functions
  boardgames.forEach(boardgame => {
    console.log(boardgame)
  })

  function handleGenreForm(e){
    setFormData({ ...genreFormData, [e.target.name]: e.target.value })
  }
  
  function sendGenreData(){
    createGenre(genreFormData)
  }

  return (
    <>
      <h1>Board Game Library</h1>
      <Form className='small-form' id='genre-form'>
        <input type="text" name="name" placeholder='Genre' required onChange={handleGenreForm} value={genreFormData.name} />
        <button type="submit">Register</button>
      </Form>
    </>
  )
}