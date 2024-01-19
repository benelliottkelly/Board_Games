import { useEffect, useState } from 'react'
import { useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CreateBoardGame from './CreateBoardGame'
import { v4 as uuidv4 } from 'uuid'

// Bootstrap Components
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
        centered >
        <Modal.Header closeButton>
          <Modal.Title>Add Board Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBoardGame />
        </Modal.Body>
      </Modal>
      <h1>Board Game Library</h1>
      <button onClick={() => setShowModal(true)}>Add Board Game</button>
      <Container >
        <Col >
          
        </Col>
        {boardgames.length > 0 &&
          boardgames.map((obj) => {
            return (
              <>
                <div className='board-game-list-container'>
                  <button value={obj.id} onClick={addGameToCollection}>+</button>
                  <Link className='game-link' to={`/boardgames/${obj.id}/`} key={uuidv4()}>
                    <div className='single-game' style={{ backgroundImage: `url("${obj.image}")` }}>
                      <h3>{obj.title}</h3>
                      <h4>{obj.year}</h4>
                    </div>
                  </Link>
                  <div className="shelf"></div>
                </div>
              </>
            )
          })}

      </Container>
    </section>
  )
}