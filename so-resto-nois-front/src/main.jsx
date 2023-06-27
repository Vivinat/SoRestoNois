import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

//importando rotas
import Register from '../components/Register.jsx';
import Game from '../components/Game.jsx';

const router = createBrowserRouter([
  {
    path: '/', //pagina home para registrar usuario
    element: <Register />
  },
  {
    path: '/game',
    element: <Game />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
