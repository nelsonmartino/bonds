// import React from 'react'
import { useParams } from 'react-router-dom'

function Detail() {
  const { tickerUSD } = useParams()
  return (
    <>
      {/* <div>Bond Details</div> */}
      <div>Ticker: {tickerUSD}</div>
    </>
  )
}

export default Detail
