import { useState } from 'react'
import { loggedUser, NewPortfolio } from '../../types'
import axios from 'axios'

const CreatePortfolio = () => {
  const [form, setForm] = useState<NewPortfolio>({
    tickerARG: '',
    qty: 0,
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const property = e.target.name
    const value = Number(e.target.value)
      ? Number(e.target.value)
      : e.target.value
    setForm({ ...form, [property]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = localStorage.getItem('loggedUser')
    if (user) {
      const { email, token } = JSON.parse(user) as loggedUser
      if (form.tickerARG && form.qty) {
        await axios
          .post(
            'http://localhost:3001/portfolios',
            {
              email,
              ...form,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )

          .then(() => alert('Bond added to Portfolio'))
          .catch((error) => console.error(error))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mt-2">
        <div className="w-1/4">
          <label className="block text-gray-500 font-bold md:text-right mb-1 pr-4">
            Nuevo activo
          </label>
        </div>
        <div className="md:w-3/4 h-10">
          <input
            className="bg-white border-2 border-gray-200 rounded px-4 mr-2 text-gray-700 h-full focus:outline-none  focus:border-blue-300"
            name="tickerARG"
            type="text"
            placeholder="Ticker ARG"
            onChange={changeHandler}
            value={form.tickerARG}
          />
          <input
            className="bg-white border-2 border-gray-200 rounded px-4 mr-2 text-gray-700 h-full focus:outline-none focus:border-blue-300"
            name="qty"
            type="number"
            min={0}
            placeholder="Cantidad"
            onChange={changeHandler}
            value={form.qty}
            step="1"
          />
          <button
            className="shadow bg-blue-200 h-10 hover:bg-blue-300 font-bold px-4 rounded"
            type="submit"
          >
            Agregar
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreatePortfolio
