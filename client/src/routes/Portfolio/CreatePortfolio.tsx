import { useState } from 'react'
import { ApiPortfolio, loggedUser, NewPortfolio } from '../../types'
import axios from 'axios'

interface CreatePortfolioProps {
  setPortfolio: React.Dispatch<React.SetStateAction<ApiPortfolio[]>>
}

const CreatePortfolio: React.FC<CreatePortfolioProps> = ({ setPortfolio }) => {
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

          .then(({ data }) => {
            setPortfolio(data)
            setForm({
              tickerARG: '',
              qty: 0,
            })
          })
          .catch((error) => console.error(error))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center mt-2 flex-wrap">
        <label className="text-gray-500 font-bold mb-1 pr-4">Activo</label>
        <input
          className="bg-white border-2 border-gray-200 rounded pl-1 mr-2 text-gray-700 h-full focus:outline-none  focus:border-blue-300 w-36"
          name="tickerARG"
          type="text"
          placeholder="Ticker ARG"
          onChange={changeHandler}
          value={form.tickerARG}
        />
        <input
          className="bg-white border-2 border-gray-200 rounded pl-1 mr-2 text-gray-700 h-full focus:outline-none focus:border-blue-300 w-24"
          name="qty"
          type="number"
          placeholder="Cantidad"
          onChange={changeHandler}
          value={form.qty}
        />
        <div>
          <button
            className="shadow bg-blue-200 h-10 hover:bg-blue-300 font-bold px-4 rounded"
            type="submit"
          >
            Agregar/Actualizar
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreatePortfolio
