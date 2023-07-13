import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './Game'
import Register from './Register'
import GameScreen from './GameScreen'
import StartScreen from './StartScreen'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'

function App() {



  return (
    <>
      <StartScreen />
    </>

  )
}

export default App
