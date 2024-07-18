import { useMemo } from 'react'
// import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'
import { Bond } from '../../types'
// import { Link, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Bonds() {
  const { bonds: data } = useAppSelector((state) => state.bonds)

  // const navigate = useNavigate()

  const columns = useMemo<MRT_ColumnDef<Bond>[]>(
    () => [
      {
        accessorKey: 'tickerUSD', //simple recommended way to define a column
        header: 'Ticker USD',
        Cell: ({ row }) => (
          <Link to={`/bonds/${row.original.tickerUSD}`}>
            {row.original.tickerUSD}
          </Link>
        ),
        enableHiding: false, //disable a feature for this column
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
      },
      {
        accessorKey: 'tickerARG', //simple recommended way to define a column
        header: 'Ticker $',
        Cell: ({ row }) => (
          <Link to={`/bonds/${row.original.tickerUSD}`}>
            {row.original.tickerARG}
          </Link>
        ),
        enableHiding: false, //disable a feature for this column
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
      },
      {
        accessorKey: 'priceUSD', //simple recommended way to define a column
        header: 'Precio USD',
      },
      {
        accessorKey: 'priceARG', //simple recommended way to define a column
        header: 'Precio $',
      },
      {
        accessorKey: 'change', //simple recommended way to define a column
        header: 'TC',
      },
      {
        accessorKey: 'currentTir', //simple recommended way to define a column
        header: 'TIR',
      },
      {
        accessorKey: 'modifiedDuration', //simple recommended way to define a column
        header: 'MD',
      },
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
      {/* <div>Bonds View</div>
      <h1>Go to Bond Detail</h1> */}
      {/* {data.map((bond) => (
        <div>
          <Link to={`/bonds/${bond.tickerUSD}`}>{bond.tickerUSD}</Link>
        </div>
      ))} */}
      <MaterialReactTable table={table} />
    </>
  )
}

export default Bonds
