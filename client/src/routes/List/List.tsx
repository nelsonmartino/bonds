import { Link } from 'react-router-dom'

function List() {
  return (
    <ul className="flex flex-col text-center text-xl font-semibold">
      <div className="py-3">
        <Link to={'/bonds/list'} className="hover:text-blue-500">
          Bonos Soberanos
        </Link>
      </div>
      <div>
        <Link to={'/bonds/list'} className="hover:text-blue-500">
          Bonos BCRA
        </Link>
      </div>
      <div className="py-3">
        <Link to={'/bonds/list'} className="hover:text-blue-500">
          Bonos Sub-Soberanos
        </Link>
      </div>
      <div>
        <Link to={'/bonds/list'} className="hover:text-blue-500">
          Bonos Corporativos (ON)
        </Link>
      </div>
    </ul>
  )
}

export default List
