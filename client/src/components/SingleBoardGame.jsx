import { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { loginOrProfile } from '../utils/helpers/common'
import { LiaStarSolid } from "react-icons/lia"
import { deleteBoardGame } from '../utils/actions/boardgame'

// Bootstap components
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/Modal'

export default function SingleBoardGame() {

  const navigate = useNavigate()
  const loadedData = useLoaderData()
  const { boardGame, Genres } = loadedData
  console.log(boardGame)
  const { created_by, date_added, description, genre, id, image, owned_by, publisher, reviews, title, year } = boardGame

  // States
  const [userPK, setUserPK] = useState()
  const [showModal, setShowModal] = useState()
  const [ res, setRes ] = useState(0)

  // Functions
  // function calculateStars(rating) {
  //   let stars = ''
  //   for (let i = 0; i < rating; i++) {
  //     stars = `${<LiaStarSolid />}` + stars
  //   }
  //   console.log(stars)
  //   return stars
  // }

  useEffect(() => {
    const userMatch = loginOrProfile()
    setUserPK(userMatch)
    setShowModal(false)
  }, [])

  function handleModalClick() {
    if (showModal === false) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const response = await deleteBoardGame(id)
      setRes(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(res?.status === 204) {
      navigate(`/boardgames/`)
    }
  }, [res])

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Deleting {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete {title}? It will be permanent</p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={handleModalClick}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete!</button>
        </Modal.Footer>
      </Modal>

      {userPK === created_by.pk &&
        <>
          <Link to={`/boardgames/${id}/edit/`}><Button>Edit</Button></Link>
          <Button type='button' onClick={handleModalClick}>Delete</Button>
        </>
      }
      <h1>{title}</h1>
      <h3>{year}</h3>
      <h3>Publisher: {publisher}</h3>
      {genre.length > 0 && <ul>
        {genre.map((obj, idx) => { return <li key={idx}>{obj.name}</li> })}
      </ul>
      }
      <img src={image} />
      <p>{description}</p>
      {reviews.length > 0 ?
        reviews.map((review, idx) => {
          return <div key={idx}>
            <h2>{review.title}</h2>
            <h3>{review.rating}/5</h3>
            <p>{review.text}</p>
          </div>
        })
        :
        <div>
          <h3>No reviews have been left for {title} yet</h3>
        </div>
      }
    </>
  )
}