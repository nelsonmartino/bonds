import { useEffect, useMemo, useState } from 'react'
import { ApiPortfolio, loggedUser } from '../../types'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table'
import { useAppDispatch } from '../../redux/hooks'
import { setLogout } from '../../redux/loginSlice'
import CreatePortfolio from './CreatePortfolio'

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<ApiPortfolio[]>([])

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

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
        .catch(() => {
          localStorage.removeItem('loggedUser')
          dispatch(setLogout())
          navigate('/login')
        })
    } else {
      dispatch(setLogout())
      navigate('/login')
    }
  }, [navigate, dispatch])

  const deletePortfolio = (tickerARG: string) => {
    const user = localStorage.getItem('loggedUser')
    if (user) {
      const { email, token } = JSON.parse(user) as loggedUser
      axios
        .delete('http://localhost:3001/portfolios', {
          data: {
            email,
            tickerARG,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          setPortfolio(data)
        })
        .catch(() => {
          localStorage.removeItem('loggedUser')
          dispatch(setLogout())
          navigate('/login')
        })
    }
  }

  const columns = useMemo<MRT_ColumnDef<ApiPortfolio>[]>(
    () => [
      {
        accessorKey: 'tickerUSD', //simple recommended way to define a column
        header: 'Ticker USD',
        Cell: ({ row }) => (
          <Link to={`/bonds/detail/${row.original.bond.tickerUSD}`}>
            {row.original.bond.tickerUSD}
          </Link>
        ),
        enableHiding: false, //disable a feature for this column
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
      },
      {
        accessorKey: 'tickerARG', //simple recommended way to define a column
        header: 'Ticker $',
        Cell: ({ row }) => (
          <Link to={`/bonds/detail/${row.original.bond.tickerUSD}`}>
            {row.original.bond.tickerARG}
          </Link>
        ),
        enableHiding: false, //disable a feature for this column
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
      },
      {
        accessorKey: 'qty', //simple recommended way to define a column
        header: 'Cantidad',
      },
      {
        accessorKey: 'bond.currentTir', //simple recommended way to define a column
        header: 'TIR',
      },
      {
        accessorKey: 'delete', //simple recommended way to define a column
        header: 'Delete',
        Cell: ({ row }) => (
          <div
            onClick={() =>
              row.original.bond.tickerARG &&
              deletePortfolio(row.original.bond.tickerARG)
            }
            className="cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <g stroke-width="0"></g>
              <g stroke-linecap="round" stroke-linejoin="round"></g>
              <g>
                {' '}
                <path
                  d="M10 11V17"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{' '}
                <path
                  d="M14 11V17"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{' '}
                <path
                  d="M4 7H20"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{' '}
                <path
                  d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{' '}
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{' '}
              </g>
            </svg>
          </div>
        ),
        enableHiding: false, //disable a feature for this column
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
      },
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data: portfolio, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: true, //turn off a feature
    // muiTableBodyRowProps: ({ row }) => ({
    //   onClick: () => {
    //     navigate(`/bonds/${row.original.tickerUSD}`)
    //   },
    //   sx: {
    //     cursor: 'pointer',
    //   },
    // }),
  })

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col w-3/4">
        <div className="text-center text-xl font-semibold p-2 bg-blue-300 rounded-md border-2 w-full">
          Tenencia
        </div>
        <div className="w-full">
          <MaterialReactTable table={table} />
        </div>
        <div>
          <CreatePortfolio setPortfolio={setPortfolio} />
        </div>
        <div className="flex justify-center mt-5">
          <button className="shadow bg-blue-200 h-10 w-52 hover:bg-blue-300 font-bold px-4 rounded">
            <Link to={'/cashflow'}>Cashflow</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
