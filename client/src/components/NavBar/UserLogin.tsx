import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'

interface LogedUser {
  name: string
  token: string
  email: string
}

const UserLogin = () => {
  const { login } = useAppSelector((state) => state.login)

  const [user, setUser] = useState<LogedUser>({
    name: '',
    token: '',
    email: '',
  })

  useEffect(() => {
    const logedUser = localStorage.getItem('loggedUser')
    if (logedUser) {
      setUser(JSON.parse(logedUser))
    }
  }, [login])
  return (
    <>
      {login ? (
        <div>{user.name}</div>
      ) : (
        <Link to={'/login'} className="hover:text-blue-500">
          Iniciar Sesión
        </Link>
      )}
    </>
  )
}

export default UserLogin
