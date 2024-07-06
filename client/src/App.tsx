import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [bonds, setBonds] = useState([])
  useEffect(() => {
    axios('http://localhost:3001/bonds')
      .then(({ data }) => setBonds(data))
      .catch((e) => console.log(e))
  }, [])

  return <>{bonds.length && bonds.map((bond) => <div>{bond.tickerUSD}</div>)}</>
}

export default App
