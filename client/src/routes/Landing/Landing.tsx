import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { loadBonds } from '../../redux/bondsSlice'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Landing() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    axios
      .get('http://localhost:3001/bonds')
      .then(({ data }) => {
        dispatch(loadBonds(data))
      })
      .catch((error) => console.error(error))
  }, [dispatch])
  return (
    <>
      <Link to={'/bonds'}>Go to bonds view</Link>
    </>
  )
}

export default Landing
