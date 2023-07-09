import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './Game'
import Register from './Register'
import GameScreen from './GameScreen'
import StartScreen from './StartScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StartScreen/>
    </>

  )
}

export default App
