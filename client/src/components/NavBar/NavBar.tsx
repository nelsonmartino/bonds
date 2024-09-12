import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Landing } from '../../routes'
import UserLogin from './UserLogin'
import { useAppSelector } from '../../redux/hooks'

function NavBar() {
  const location = useLocation()

  const navigate = useNavigate()

  const { login } = useAppSelector((state) => state.login)

  return (
    <>
      <div className="flex flex-row rounded-lg justify-between bg-blue-300 border-2 border-blue-500 p-4">
        <div className="flex flex-row">
          {location.pathname !== '/bonds' && (
            <Link className="font-bold hover:text-blue-500 pr-3" to={'/bonds'}>
              BonArg
            </Link>
          )}
          {location.pathname === '/bonds' && (
            <div className="font-bold pr-3">BonArg</div>
          )}
          {location.pathname && (
            <div
              className="font-bold hover:text-blue-500 pl-3"
              onClick={() => navigate(-1)}
            >
              Atrás
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between font-semibold">
          <Link to={'/bonds'} className="hover:text-blue-500 pr-3">
            Bonos
          </Link>
          {!login && (
            <Link to={'/register'} className="hover:text-blue-500 px-3">
              Registrarse
            </Link>
          )}
          {login && (
            <Link to={'/portfolio'} className="hover:text-blue-500 px-3">
              Portfolio
            </Link>
          )}
          <UserLogin />
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
