import { useState } from 'react'
import { Bond, BondErrors } from '../../types'
import { validate } from '../../utils/validate'
import axios from 'axios'
let i = 1

function Create() {
  const [events, setEvents] = useState<string[]>(['Evento 1'])

  const [form, setForm] = useState<Partial<Bond>>({
    tickerUSD: '',
    tickerARG: '',
    category: 'hard',
    emitter: 'corp',
    description: '',
    dates: [],
    amortization: [],
    interests: [],
  })

  const [errors, setErrors] = useState<Partial<BondErrors>>({})

  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const property = e.target.name
    const value = e.target.value
    setErrors(validate({ ...form, [property]: value }))
    setForm({ ...form, [property]: value })
  }

  const datesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target.name
    if (event === 'first_date') {
      const emDate = e.target.value
      if (form.dates) {
        const newDates = form.dates.slice(1)
        newDates.unshift(emDate)
        setErrors(validate({ ...form, dates: newDates }))
        setForm({ ...form, dates: newDates })
      } else {
        setErrors(validate({ ...form, dates: [emDate] }))
        setForm({ ...form, dates: [emDate] })
      }
    } else {
      if (form.dates) {
        const newDates = [...form.dates]
        newDates[Number(event)] = e.target.value
        setErrors(validate({ ...form, dates: [...newDates] }))
        setForm({ ...form, dates: [...newDates] })
      }
    }
  }

  const numbersHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const property = e.target.id
    if (property === 'interests' || property === 'amortization') {
      const event = Number(e.target.name)
      const value = Number(e.target.value)
      const newPercents = { ...form }[property]
      if (newPercents) {
        newPercents[event] = value
        setErrors(validate({ ...form, [property]: newPercents }))
        setForm({ ...form, [property]: newPercents })
      }
    }
    if (property === 'initialValue') {
      const value = Number(e.target.value)
      setErrors(validate({ ...form, initialValue: value }))
      setForm({ ...form, initialValue: value })
    }
  }

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !Object.keys(errors).length &&
      form.dates?.length === events.length + 1 &&
      form.amortization?.length === events.length &&
      form.interests?.length === events.length &&
      form.tickerUSD !== '' &&
      form.tickerARG !== '' &&
      form.description !== ''
    ) {
      await axios
        .post('http://localhost:3001/bonds/create', form)
        .then(() => alert('Bond created'))
        .catch((error) => console.error(error))
    } else {
      setErrors({ ...errors, tickerUSD: 'Missing information' })
    }
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
            name="tickerUSD"
            type="text"
            onChange={changeHandler}
            value={form.tickerUSD}
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
            name="tickerARG"
            type="text"
            onChange={changeHandler}
            value={form.tickerARG}
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
          <select
            name="category"
            className="bg-white border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300"
            onChange={changeHandler}
            value={form.category}
          >
            <option value="hard">Hard Dolar</option>
            <option value="cer">CER</option>
            <option value="badlar">Badlar</option>
            <option value="dlinked">Dolar Linked</option>
          </select>
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
          <select
            name="emitter"
            className="bg-white border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300"
            onChange={changeHandler}
            value={form.emitter}
          >
            <option value="corp">Corporativo</option>
            <option value="cbank">Banco Central</option>
            <option value="treasury">Tesoro</option>
            <option value="province">Provincia</option>
          </select>
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
            name="description"
            type="text"
            onChange={changeHandler}
            value={form.description}
            maxLength={50}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mt-2">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="description"
          >
            Valor Inicial
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-white border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300  "
            name="initialValue"
            id="initialValue"
            type="number"
            onChange={numbersHandler}
            value={form.initialValue}
            maxLength={50}
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
            name="first_date"
            onChange={datesHandler}
            value={form.dates && form.dates[0]}
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
      {events.map((event, index) => {
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
                name={`${index + 1}`}
                type="date"
                placeholder="Fecha"
                onChange={datesHandler}
                value={form.dates && form.dates[index + 1]}
              />
              <input
                className="bg-white border-2 border-gray-200 rounded w-1/6 py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300"
                name={`${index}`}
                id="interests"
                type="number"
                min={0}
                max={100}
                placeholder="Interés"
                onChange={numbersHandler}
                value={form.interests && form.interests[index]}
                step="0.001"
              />
              <span className="mr-2"> %</span>
              <input
                className="bg-white border-2 border-gray-200 rounded w-1/6 py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-blue-300"
                name={`${index}`}
                id="amortization"
                type="number"
                min={0}
                max={100}
                placeholder="Amortización"
                onChange={numbersHandler}
                value={form.amortization && form.amortization[index]}
                step="0.001"
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
            type="submit"
          >
            Crear
          </button>
        </div>
      </div>
      <div className="mt-2 md:flex md:items-center">
        <div className="md:w-1/3"></div>
        {Object.keys(errors) &&
          Object.entries(errors).map((error) => (
            <div className="text-red-600 md:w-2/3">{error[1]}</div>
          ))}
      </div>
    </form>
  )
}

export default Create
