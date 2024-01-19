import { useEffect, useState } from 'react'
import { useLoaderData } from "react-router-dom"
import { Form } from "react-router-dom"
import { loginOrProfile } from '../utils/helpers/common'
import { addBoardGameToCollection } from '../utils/actions/boardgame'

export default function AddToCollection() {

  const loadedData = useLoaderData()
  console.log(loadedData)
  const { boardGame, genres } = loadedData
  const { id, image, title, year } = boardGame

  // State
  const [ formData, setFormData ] = useState({
  })
  const [ userPK, setUserPK ] = useState()

  // Functions
  useEffect(() => {
    const userMatch = loginOrProfile()
    setUserPK(userMatch)
    setFormData({ ...formData, game: id , game_owner: userMatch})
  }, [])

  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log('formData -> ', formData)
  }

  function handleSubmit(e) {
    console.log('handlesubmit', formData)
    e.preventDefault()
    const res = addBoardGameToCollection(formData)
    console.log(res)
    // setRes(res)
  }

  return (
    <section className='add-to-collection-container'>
      <h2>Adding {title} to your collection:</h2>
      <img src={image} alt={`Image of ${title}`}/>
      <Form className='form' id='register-form' method='POST'>
        {/* <input type='hidden' name='game' onChange={handleChange} value={id}/>
        <input type='hidden' name='game_owner' onChange={handleChange} value={userPK}/> */}
        <h3>How many copies do you own?</h3>
        <input type="number" min='0' name='quantity' placeholder='Number of copies' onChange={handleChange} value={formData.quantity}/>
        <button type="button" onClick={handleSubmit}>Add Game To Collection</button>
        {/* {res && <p className='danger'>{res.status}: {res.statusText}</p>} */}
      </Form>
    </section>
  )
}