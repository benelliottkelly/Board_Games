import { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from "react-router-dom"
import { Form } from "react-router-dom"
import { loginOrProfile } from '../utils/helpers/common'
import { addBoardGameToCollection } from '../utils/actions/boardgame'

export default function AddToCollection() {

  const loadedData = useLoaderData()
  const { boardGame, genres } = loadedData
  const { id, image, title, year, owned_by } = boardGame

  const navigate = useNavigate()

  // State
  const [ formData, setFormData ] = useState({
  })
  const [ userPK, setUserPK ] = useState()
  const [ res, setRes ] = useState(0)

  // Functions
  function scrollUp() {
    document.documentElement.scrollTop = 0
  }
  scrollUp()

  useEffect(() => {
    const userMatch = loginOrProfile()
    setUserPK(userMatch)
    setFormData({ ...formData, game: id , game_owner: userMatch})
  }, [])

  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log('formData -> ', formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await addBoardGameToCollection(formData)
      setRes(response)
    } catch (error) {
      console.log(error)
    }
      // * To be added, detect if user owns game already and edit ownership instead of adding a new one
      // const listOfOwners = owned_by.map((owner) => owner.pk)
      // console.log('list of owners ->', listOfOwners)
      // const isOwner = listOfOwners.includes(userPK)
      // console.log('is owner -> ', isOwner)
      // if (isOwner === false) {
      // } else {
      // }
  }

  useEffect(() => {
    if(res?.status === 201) {
      navigate(`/users/${userPK}`)
    }
  }, [res])

  return (
    <section className='add-to-collection-container'>
      <h2>To add {title} to your collection, enter the number of copies you own below:</h2>
      <img className='large-game-image' src={image} alt={`Image of ${title}`}/>
      <Form className='quantity-form' id='register-form' method='POST'>
        <input type="number" min='0' name='quantity' placeholder='Number of copies' onChange={handleChange} value={formData.quantity}/>
        <button className='btn form-button' type="button" onClick={handleSubmit}>Add Game To Collection</button>
      </Form>
    </section>
  )
}