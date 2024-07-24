import { useState } from 'react'
let i = 1

function Create() {
  const [events, setEvents] = useState<string[]>(['Evento 1'])

  const addEvent = () => {
    i = i + 1
    setEvents([...events, `Evento ${i}`])
  }

  const removeEvent = () => {
    if (i > 1) {
      i = i - 1
      setEvents([...events].slice(0, events.length - 1))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="md:flex md:items-center mt-2">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="tickerUSD"
          >
            Ticker USD
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-white border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300  "
            id="tickerUSD"
            type="text"
          />
        </div>
      </div>
      <div className="md:flex md:items-center mt-2">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="tickerARG"
          >
            Ticker ARG
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-white border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300  "
            id="tickerARG"
            type="text"
          />
        </div>
      </div>
      <div className="md:flex md:items-center mt-2">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="category"
          >
            Categoría
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-white border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300  "
            id="category"
            type="text"
          />
        </div>
      </div>
      <div className="md:flex md:items-center mt-2">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="emitter"
          >
            Emisor
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-white border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300  "
            id="emitter"
            type="text"
          />
        </div>
      </div>
      <div className="md:flex md:items-center mt-2">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="description"
          >
            Descripción
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-white border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300  "
            id="description"
            type="text"
          />
        </div>
      </div>
      <div className="md:flex md:items-center mt-2">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="description"
          >
            Fecha de Emisión
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-white border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300  "
            id="description"
            type="date"
          />
        </div>
      </div>
      <div className="mt-2 md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-blue-200 mr-2 hover:bg-blue-300  font-bold py-2 px-4 rounded"
            type="button"
            onClick={addEvent}
          >
            Agregar evento
          </button>
          <button
            className="shadow bg-blue-200 hover:bg-blue-300  font-bold py-2 px-4 rounded"
            type="button"
            onClick={removeEvent}
          >
            Eliminar evento
          </button>
        </div>
      </div>
      {events.map((event) => {
        return (
          <div className="md:flex md:items-center mt-2" key={event}>
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="description"
              >
                {event}
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-white border-2 border-gray-200 rounded py-2 px-4 mr-2 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300  "
                id="description"
                type="date"
                placeholder="Fecha"
              />
              <input
                className="bg-white border-2 border-gray-200 rounded w-1/6 py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300"
                id="description"
                type="number"
                min={0}
                max={100}
                placeholder="Interés"
              />
              <span className="mr-2"> %</span>
              <input
                className="bg-white border-2 border-gray-200 rounded w-1/6 py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300"
                id="description"
                type="number"
                min={0}
                max={100}
                placeholder="Amortización"
              />
              <span> %</span>
            </div>
          </div>
        )
      })}

      <div className="mt-2 md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-blue-200 hover:bg-blue-300  font-bold py-2 px-4 rounded"
            type="button"
          >
            Crear
          </button>
        </div>
      </div>
    </form>
  )
}

export default Create
