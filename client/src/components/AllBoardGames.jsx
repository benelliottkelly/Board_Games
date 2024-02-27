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
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [displayGames, setDisplayGames] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filter, setFilter] = useState('All')
  const [genresList, setGenresList] = useState()

  // Functions
  // * For search bar
  useEffect(() => {
    async function getData() {
      const res = await loadedData
      const { boardgames } = res
      setDisplayGames(...displayGames, boardgames)
      setIsLoading(false)
    }
    getData()
  }, [loadedData])


  useEffect(() => {
    const allGenres = [... new Set(genres.map(genre => genre.name))]
    allGenres.unshift('All')
    setGenresList(allGenres)
  }, [genres])

  useEffect(() => {
    const pattern = new RegExp(searchText, 'i')
    setDisplayGames(boardgames.filter(game => {
      const genres = game.genre.map(genre => genre.name)
      return ((filter === 'All' || genres.includes(filter)) && pattern.test(game.title))
    }))
  }, [searchText, filter])

  // * Scroll to top of page
  function scrollUp() {
    document.documentElement.scrollTop = 0
  }
  scrollUp()

  // * Close add board game modal when request is successful
  useEffect(() => {
    if (res?.status === 201) {
      setShowModal(false)
    }
  }, [res])

  // * Navigate to add game to collection screen upon clicking green +
  function addGameToCollection(e) {
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
        <p>To add an existing game to your collection click the <span id='add-explainer'>+</span> button and input how many copies of the game you own.</p>
        <p>Or to view the game in greater detail click on the box itself.</p>
      </article>
      {isLoading ? (
        <div className='loading-title all-board-games-loader'>
          <h2>Loading<span className='loading-dots' id='dot-1'>.</span><span className='loading-dots' id='dot-2'>.</span><span className='loading-dots' id='dot-3'>.</span></h2>
        </div>
      ) : (
        <>
          <section className='filters-container' >
            <select value={filter} className='filter-inputs' id="genre-filters" onChange={(evt) => setFilter(evt.target.value)}>
              {genresList.map((genre) => {
                return <option value={genre} key={uuidv4()}>{genre}</option>
              })
              }
            </select>
            <input className='filter-inputs' placeholder='Search'
              onChange={(evt) => setSearchText(evt.target.value)}
              value={searchText}
            ></input>
          </section>
          {displayGames.length > 0 &&
            <div className='bookshelf-outer'>
              <Container className='bookshelf'>
                {displayGames.map((obj) => {
                  return (
                    <div key={uuidv4()} className='board-game-list-container'>
                      <div className='inner-walls'>
                        <button className='add-to-collection-button' value={obj.id} onClick={addGameToCollection}>+</button>
                        <div className='back-wall' >
                          <Link className='game-link' to={`/boardgames/${obj.id}/`} >
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
          }
        </>
      )}
    </section>
  )
}