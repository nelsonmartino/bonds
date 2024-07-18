function DataCard({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col w-1/2 rounded-md bg-blue-300 border-2 h-fit">
      <div className="text-xl font-semibold p-2">{name}</div>
      <div className="text-2xl text-center font-bold p-2">{value}</div>
    </div>
  )
}

export default DataCard
