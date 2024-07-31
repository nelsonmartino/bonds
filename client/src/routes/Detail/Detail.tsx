import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Bond } from '../../types'
import DataCard from '../../components/DataCard/DataCard'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'
import moment from 'moment'

interface Cashflow {
  date: Date
  amortization: number
  interest: number
  cash: number
}

function Detail() {
  const { tickerUSD } = useParams()
  console.log(tickerUSD)

  const [bond, setBond] = useState<Bond>()
  const [data, setData] = useState<Cashflow[]>([])

  useEffect(() => {
    axios
      .get(`http://localhost:3001/bonds?ticker=${tickerUSD}`)
      .then(({ data }) => {
        setBond(data)
        const currentCashflow = data.dates.map((date: Date, index: number) => {
          let amortization: number
          let interest: number
          let cash: number
          if (index) {
            amortization = data.amortization[index - 1]
            interest = data.interests[index - 1]
            cash = data.cashflow[index - 1]
          } else {
            amortization = 0
            interest = 0
            cash = 0
          }
          return { date, amortization, interest, cash }
        })
        setData(currentCashflow)
      })
      .catch((error) => console.error(error))
  }, [tickerUSD])

  const columns = useMemo<MRT_ColumnDef<Cashflow>[]>(
    () => [
      {
        accessorKey: 'date', //simple recommended way to define a column
        header: 'Fecha',
        Cell: ({ row }) => (
          <div>{moment.utc(row.original.date).format('DD/MM/YYYY')}</div>
        ),
      },
      {
        accessorKey: 'amortization', //simple recommended way to define a column
        header: 'Capital',
      },
      {
        accessorKey: 'interest', //simple recommended way to define a column
        header: 'Interes',
      },
      {
        accessorKey: 'cash', //simple recommended way to define a column
        header: 'Cashflow',
      },
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableRowSelection: false, //enable some features
    // enableColumnOrdering: false, //enable a feature for all columns
    // enableGlobalFilter: false, //turn off a feature
    enablePagination: false,
    // enableSorting: false,
    enableColumnActions: false,
    enableTopToolbar: false,
    // enableStickyHeader: true,
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
      <div className="bg-blue-300 text-3xl font-extrabold text-center m-1 p-4 rounded-md">{`${tickerUSD} / ${bond?.tickerARG}`}</div>
      <div className="flex flex-row">
        <div className="flex flex-row content-start w-1/2 flex-wrap">
          <DataCard name="TIR" value={`${bond?.currentTir} %` || '0 %'} />
          <DataCard
            name="M. Duration"
            value={`${bond?.modifiedDuration}` || '0'}
          />
          <DataCard
            name="Precio USD"
            value={`USD ${bond?.priceUSD}` || 'USD 0'}
          />
          <DataCard name="Precio ARG" value={`$ ${bond?.priceARG}` || '$ 0'} />
          <DataCard name="TC" value={`${bond?.change} $/USD` || '0 $/USD'} />
          <DataCard name="Paridad" value={`${bond?.parity} %` || '0 %'} />
          <DataCard
            name="Actualizado"
            value={
              `${moment(bond?.updatedAt).startOf('minute').fromNow()}` || ''
            }
          />
        </div>
        <div className="w-1/2">
          <div className="text-center text-xl font-semibold p-2 bg-blue-300 rounded-md border-2">
            Cashflow
          </div>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </>
  )
}

export default Detail
