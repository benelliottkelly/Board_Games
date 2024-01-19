import { useEffect, useState } from 'react'
import { useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CreateBoardGame from './CreateBoardGame'
import { v4 as uuidv4 } from 'uuid'

// Bootstrap Components
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'

export default function AllBoardGames() {

  // Loaded Data
  const loadedData = useLoaderData()
  const res = useActionData()
  const { boardgames, genres } = loadedData
  const { created_by, date_added, description, genre, id, image, owned_by, publisher, reviews, title, year } = boardgames
  const navigate = useNavigate()

  // States
  const [showModal, setShowModal] = useState(false)

  // Functions
  useEffect(() => {
    console.log('res ->', res)
    if (res?.status === 201) {
      setShowModal(false)
    }
  }, [res])

  function addGameToCollection(e) {
    console.log(e.target.value)
    navigate(`/boardgames/${e.target.value}/collect/`)
  }

  return (
    <section className='board-game-library'>
      <Modal
        show={showModal}
        fullscreen={true}
        onHide={() => setShowModal(false)}
        centered 
        className='add-game-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Add Board Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBoardGame />
        </Modal.Body>
      </Modal>
      <h1>Board Game Library</h1>
      <article className='library-info'>
        <p>Welcome to the board game library.</p>
        <p>To add a game to the library click <button onClick={() => setShowModal(true)} className='btn btn-add-game'>Add Game</button>.</p>
        <p>To add an existing game to your collection click the <span id='add-explainer'>+</span> button and input how many boxes of the game you own.</p>
        <p>Or to view the game in greater detail click on the box itself.</p>
      </article>
      <div className='bookshelf-outer'>
        <Container className='bookshelf'>
            {boardgames.length > 0 &&
              boardgames.map((obj) => {
                return (
                    <div className='board-game-list-container'>
                      <div className='inner-walls'>
                          <button className='add-to-collection-button' value={obj.id} onClick={addGameToCollection}>+</button>
                        <div className='back-wall' >
                          <Link className='game-link' to={`/boardgames/${obj.id}/`} key={uuidv4()}>
                            <div className='single-game' style={{ backgroundImage: `url("${obj.image}")` }}>
                              <h3>{obj.title}</h3>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                )
              })}
        </Container>
      </div>
    </section>
  )
}