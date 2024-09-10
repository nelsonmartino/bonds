import { Outlet, Link, useLocation } from 'react-router-dom'
import { Landing } from '../../routes'
import UserLogin from './UserLogin'
// import { useState } from 'react'
import { useAppSelector } from '../../redux/hooks'

function NavBar() {
  const location = useLocation()

  const { login } = useAppSelector((state) => state.login)

  return (
    <>
      <div className="flex flex-row rounded-lg justify-between bg-blue-300 border-2 border-blue-500 p-4">
        {location.pathname !== '/bonds' && (
          <Link className="font-bold hover:text-blue-500" to={'/bonds'}>
            BonArg
          </Link>
        )}
        {location.pathname === '/bonds' && (
          <div className="font-bold">BonArg</div>
        )}
        <div className="flex flex-row justify-between font-semibold">
          <Link to={'/bonds'} className="hover:text-blue-500 pr-3">
            Bonos
          </Link>
          {!login && (
            <Link to={'/register'} className="hover:text-blue-500 px-3">
              Registrarse
            </Link>
          )}
          {/* <Link to={'/login'} className="hover:text-blue-500">
            Iniciar Sesión
          </Link> */}
          <UserLogin />
        </div>
      </div>
      {location.pathname === '/' && <Landing />}
      <div>
        {/* <Outlet context={setIsLoged} /> */}
        <Outlet />
      </div>
    </>
  )
}

export default NavBar
