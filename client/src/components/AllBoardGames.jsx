import { useEffect, useState } from 'react'
import { useActionData, useLoaderData } from 'react-router-dom'
import { createGenre } from '../utils/actions/genres'
import { Form, Link } from 'react-router-dom'
import CreateBoardGame from './CreateBoardGame'
import { v4 as uuidv4 } from 'uuid'

// Bootstrap Components
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'

export default function AllBoardGames() {

  // Loaded Data
  const loadedData = useLoaderData()
  const res = useActionData()
  const { boardgames, genres } = loadedData
  // console.log(boardgames)
  const { created_by, date_added, description, genre, id, image, owned_by, publisher, reviews, title, year } = boardgames
  
  // States
  const [ showModal, setShowModal ] = useState(false)

  // Functions
  useEffect(() => {
    console.log('res ->', res)
    if(res?.status === 201) {
      setShowModal(false)
    }
  }, [res])

  return (
    <>
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
      { boardgames.length > 0 && 
        boardgames.map((obj)=>{
        return <Link to={`/boardgames/${obj.id}/`} key={uuidv4()}>
            <div style={{backgroundImage: `url("${obj.image}")`}}>
              <h3>{obj.title}</h3>
              <h4>{obj.year}</h4>
            </div>
          </Link>
      })}  
    </>
  )
}