import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GameScreen from './GameScreen'
import StartScreen from './StartScreen'
import Register from './Register'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Router = createBrowserRouter([
  { path: '/',
  element: <App />,
  children: [
    { path: '/StartScreen',
    element: <StartScreen />,},
    { path: '/GameScreen',
    element: <GameScreen />,},
    { path: '/Register',
    element: <Register />,}
  ] },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
