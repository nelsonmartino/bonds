import { useEffect, useMemo, useState } from 'react'
import { ApiPortfolio } from '../../types'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table'

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
        .catch(() => {
          navigate('/login')
        })
    }
  }, [navigate])

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
      // {
      //   accessorKey: 'bond.tickerARG', //simple recommended way to define a column
      //   header: 'Ticker $',
      // },
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
    <>
      {/* {portfolio.map((p) => (
        <div className="flex flex-row">
          <div className="px-3">{p.bond.tickerUSD}</div>
          <div className="px-3">{p.qty}</div>
        </div>
      ))} */}
      <MaterialReactTable table={table} />
    </>
  )
}

export default Portfolio
