import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { cashflow } from '../../types'
import { useAppDispatch } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { setLogout } from '../../redux/loginSlice'
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table'
import moment from 'moment'

function Cashflow() {
  const [cashflow, setCashflow] = useState<cashflow[]>([])

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) {
      const { email, token } = JSON.parse(loggedUser)
      axios
        .get<cashflow[]>(
          `http://localhost:3001/portfolios/cashflow?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => {
          setCashflow(data)
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

  const columns = useMemo<MRT_ColumnDef<cashflow>[]>(
    () => [
      {
        accessorKey: 'date', //simple recommended way to define a column
        header: 'Fecha',
        Cell: ({ row }) => (
          <div>{moment.utc(row.original.date).format('DD/MM/YYYY')}</div>
        ),
      },
      {
        accessorKey: 'tickerARG', //simple recommended way to define a column
        header: 'Ticker ARG',
      },
      {
        accessorKey: 'eventCashflow', //simple recommended way to define a column
        header: 'Monto',
      },
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data: cashflow, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableRowSelection: true, //enable some features
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
          Cashflow
        </div>
        <div className="w-full">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  )
}

export default Cashflow
