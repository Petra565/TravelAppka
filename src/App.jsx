import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Map from '../src/components/Map'
function App() {

  return (
      <>
          <header className=" font-[Corinthia] font-bold text-[6rem] text-white bg-[#ffb703] px-6 w-full text-center">TravelApp</header>

    <Map></Map>
    </>
  )
}

export default App
