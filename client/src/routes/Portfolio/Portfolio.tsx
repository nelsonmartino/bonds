import { useEffect, useState } from 'react'
import { ApiPortfolio } from '../../types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<ApiPortfolio[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) {
      const { email, token } = JSON.parse(loggedUser)
      axios
        .get<ApiPortfolio[]>(
          `http://localhost:3001/portfolios?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setPortfolio(res.data)
        })
        .catch(() => navigate('/login'))
    }
  }, [navigate])

  return (
    <>
      {portfolio.map((p) => (
        <div>{p.bond.tickerUSD}</div>
      ))}
    </>
  )
}

export default Portfolio
