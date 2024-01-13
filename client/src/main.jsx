// Packages
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'


// Styles
import './index.css'


// Page components
import App from './App.jsx'
import Home from './components/Home.jsx'

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
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: 'users/:userPk',
        element: <SingleUser />
      },
      {
        path: '/boardgames',
        element: <AllBoardGames />
      },
      {
        path: '/boardgames/create',
        element: <CreateBoardGame />
      },
      {
        path: '/boardgames/:boardgamePk',
        element: <SingleBoardGame />
      },
      {
        path: '/boardgames/:boardgamePk/edit',
        element: <EditBoardGame />
      }
    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
