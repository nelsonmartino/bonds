// import { useEffect, useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setLogin } from '../../redux/loginSlice'

// interface LogedUser {
//   name: string
//   token: string
//   email: string
// }

const UserLogin = () => {
  const { login, name } = useAppSelector((state) => state.login)

  const dispatch = useAppDispatch()

  // const [user, setUser] = useState<LogedUser>({
  //   name: '',
  //   token: '',
  //   email: '',
  // })

  useEffect(() => {
    const logedUser = localStorage.getItem('loggedUser')
    if (logedUser) {
      // setUser(JSON.parse(logedUser))
      // if (!login) {
      //   dispatch(setLogin(true))
      // }
      dispatch(setLogin({ login: true, name: JSON.parse(logedUser).name }))
    }
  }, [dispatch])

  const logoutHandler = () => {
    dispatch(setLogin(false))
    localStorage.removeItem('loggedUser')
  }

  return (
    <>
      {login ? (
        <div className="flex flex-row pl-3">
          <p>{name} </p>
          <p onClick={logoutHandler} className="cursor-pointer pl-1">
            <svg
              className="h-6 w-6 text-red-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {' '}
              <path stroke="none" d="M0 0h24v24H0z" />{' '}
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{' '}
              <path d="M7 12h14l-3 -3m0 6l3 -3" />
            </svg>
          </p>
        </div>
      ) : (
        <Link to={'/login'} className="hover:text-blue-500 pl-3">
          Iniciar Sesión
        </Link>
      )}
    </>
  )
}

export default UserLogin
