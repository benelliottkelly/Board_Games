// Packages
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


// Styles
import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'


// Page components
import App from './App.jsx'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import SingleUser from './components/SingleUser.jsx'
import AllBoardGames from './components/AllBoardGames.jsx'
import CreateBoardGame from './components/CreateBoardGame.jsx'
import SingleBoardGame from './components/SingleBoardGame.jsx'
import EditBoardGame from './components/EditBoardGame.jsx'
import AllGenres from './components/AllGenres.jsx'
import CreateGenre from './components/CreateGenre.jsx'
import SingleGenre from './components/SingleGenre.jsx'
import EditGenre from './components/EditGenre.jsx'
import AddToCollection from './components/AddToCollection.jsx'

// Loaders
import { boardGamesLoader, singleBoardGameLoader, singleUserLoader, genresLoader, singleGenreLoader } from './utils/loaders.js'

// Actions
import { loginUser, registerUser } from './utils/actions/auth.js'
import { createBoardGame, editBoardGame } from './utils/actions/boardgame.js'

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/register',
        element: <Register />,
        action: async ({ request }) => registerUser(request)
      },
      {
        path: '/login',
        element: <Login />,
        action: async ({ request }) => loginUser(request)
      },
      {
        path: 'users/:userpk',
        element: <SingleUser />,
        loader: async ({ params }) => singleUserLoader(params.userpk)
      },
      {
        path: '/boardgames',
        element: <AllBoardGames />,
        action: async ({ request }) => createBoardGame(request),
        loader: boardGamesLoader
      },
      {
        path: '/boardgames/create',
        element: <CreateBoardGame />,
        loader: boardGamesLoader
      },
      {
        path: '/boardgames/:boardgamepk',
        element: <SingleBoardGame />,
        loader: async ({ params }) => singleBoardGameLoader(params.boardgamepk)
      },
      {
        path: '/boardgames/:boardgamepk/edit',
        element: <EditBoardGame />,
        action: async ({ request, params }) => editBoardGame(request, params.boardgamepk),
        loader: async ({ params }) => singleBoardGameLoader(params.boardgamepk)
      },
      {
        path: 'boardgames/:boardgamepk/collect',
        element: <AddToCollection />,
        loader: async ({ params }) => singleBoardGameLoader(params.boardgamepk)
      },
      {
        path: '/genres',
        element: <AllGenres />,
        loader: genresLoader
      },
      {
        path: '/genres/create',
        element: <CreateGenre />,
        loader: genresLoader
      },
      {
        path: '/genres/:genrepk',
        element: <SingleGenre />,
        loader: async ({ params }) => singleGenreLoader(params.genrepk)
      },
      {
        path: '/genres/:genrepk/edit',
        element: <EditGenre />,
        loader: async ({ params }) => singleGenreLoader(params.genrepk)
      }
    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
