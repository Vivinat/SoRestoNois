import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GameScreen from './GameScreen'
import StartScreen from './StartScreen'
import Register from './Register'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'




const router = createBrowserRouter([
  { path: '/',
  element: <App />
  }, 
  {
    path: 'StartScreen',
    element: <StartScreen />
  },
  {
  path: 'Register',
  element: <Register /> 
  },
  {
  path: 'GameScreen',
  element: <GameScreen /> 
},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
