import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { createGenre } from '../utils/actions/genres'
import { Form, Link } from 'react-router-dom'

export default function AllBoardGames() {

  // Loaded Data
  const boardgames = useLoaderData()
  console.log(boardgames)
  const { created_by, date_added, description, genre, id, image, owned_by, publisher, reviews, title, year } = boardgames
  
  // States
  // const [ genreFormData, setGenreFormData ] = useState({
  //   name: '',
  // })

  // Functions

  return (
    <>
      <h1>Board Game Library</h1>
      <Form className='small-form' id='genre-form'>
        {/* <input type="text" name="name" placeholder='Genre' required onChange={handleGenreForm} value={genreFormData.name} />
        <button type="submit">Register</button> */}
      </Form>
      { boardgames.length > 0 && 
        boardgames.map((obj, idx)=>{
        return <Link to={`/boardgames/${obj.id}/`}>
            <div key={idx} style={{backgroundImage: `url("${obj.image}")`}}>
              <h3>{obj.title}</h3>
              <h4>{obj.year}</h4>
            </div>
          </Link>
      })}  
    </>
  )
}