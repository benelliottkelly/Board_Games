import { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { loginOrProfile } from '../utils/helpers/common'
import { LiaStarSolid } from "react-icons/lia"
import { deleteBoardGame } from '../utils/actions/boardgame'
import { v4 as uuidv4 } from 'uuid'

// Bootstap components
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/Modal'

export default function SingleBoardGame() {

  const navigate = useNavigate()
  const loadedData = useLoaderData()
  const { boardGame, Genres } = loadedData
  const { created_by, date_added, description, genre, id, image, owned_by, publisher, reviews, title, year } = boardGame

  // States
  const [userPK, setUserPK] = useState()
  const [showModal, setShowModal] = useState()
  const [res, setRes] = useState(0)

  // Functions
  function scrollUp() {
    document.documentElement.scrollTop = 0
  }
  scrollUp()

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
    if (res?.status === 204) {
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
          <p>Are you sure you want to delete {title}? This change will be permanent.</p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={handleModalClick}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete!</button>
        </Modal.Footer>
      </Modal>
      <section className='page-container'>
        <section className='show-game-container'>
          {userPK === created_by.pk &&
            <div className='buttons-container'>
              <Link to={`/boardgames/${id}/edit/`}><Button>Edit</Button></Link>
              <Button className='btn btn-danger' type='button' onClick={handleModalClick}>Delete</Button>
            </div>
          }
          <h1>{title}</h1>
          <h3 className='special-characters'>({year})</h3>
          <div className='publisher-container'>
            <h3>Publisher:</h3><h3>{publisher}</h3>
          </div>
          {genre.length > 0 &&
            <div className='genres-container'>
              <h4>Genres:</h4>
              <ul>
                {genre.map((obj) => { return <li className='single-genre' key={uuidv4()}>{obj.name}</li> })}
              </ul>
            </div>
          }
          <img className='large-game-image' src={image} />
          <div className='description-container'>
            <p className='special-characters' >{description}</p>
          </div>
          <article className='reviews-made-container'>
            <h3>Reviews:</h3>
            <div className='carousel'>
              {reviews.length > 0 ?
                reviews.map((review) => {
                  return <div key={uuidv4()} className='details-container'>
                    <h2>{review.title}</h2>
                    <h3>{review.rating}/5</h3>
                    <p>{review.text}</p>
                  </div>
                })
                :
                <div>
                  <h4>No reviews have been left for {title} yet</h4>
                </div>
              }
            </div>
          </article>
          <article className='owned-by-container'>
            <h3>This game is currently owned by:</h3>
            <div className='carousel'>
              {owned_by.length > 0 ?
                owned_by.map((owner) => {
                  return <div key={uuidv4()} className='details-container'>
                    <Link className='link-to-owner' to={`/users/${owner.pk}/`}>
                      <div className='to-owner-picture' style={{ backgroundImage: `url("${owner.image}")` }}>
                        <h2 className='owner-username'>{owner.username}</h2>
                      </div>
                    </Link>
                  </div>
                })
                :
                <div>
                  <h4>{title} has not been added to anyones list of owned games yet...</h4>
                </div>
              }
            </div>
          </article>
        </section>
      </section>
    </>
  )
}