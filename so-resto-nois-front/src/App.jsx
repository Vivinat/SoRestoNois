import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './Game'
import Register from './Register'
import GameScreen from './GameScreen'
import StartScreen from './StartScreen'
import { Outlet } from 'react-router-dom'

function App() {
  const makeAPICall = async () => {
    try{
      const response = await fetch('/api/updateHealth', {mode:'cors'});
      const data = await response.json();
      console.log(data)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    makeAPICall()
  }, [])


  return (
    <>
    <GameScreen />
    </>

  )
}

export default App
