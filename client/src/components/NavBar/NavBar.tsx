import { Outlet, Link, useLocation } from 'react-router-dom'
import { Landing } from '../../routes'

function NavBar() {
  const location = useLocation()
  console.log(location)

  return (
    <>
      <div className="flex flex-row rounded-lg justify-between bg-blue-300 border-2 border-blue-500 p-4">
        {location.pathname !== '/bonds/list' && (
          <Link className="font-bold hover:text-blue-500" to={'/bonds/list'}>
            BonArg
          </Link>
        )}
        {location.pathname === '/bonds/list' && (
          <div className="font-bold">BonArg</div>
        )}
        <div className="flex flex-row justify-between font-semibold">
          <Link to={'/bonds/list'} className="hover:text-blue-500">
            Bonos
          </Link>
          <Link to={'/register'} className="hover:text-blue-500 px-6">
            Registrarse
          </Link>
          <Link to={'/login'} className="hover:text-blue-500">
            Iniciar Sesión
          </Link>
        </div>
      </div>
      {location.pathname === '/' && <Landing />}
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default NavBar
