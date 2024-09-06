import { useState } from 'react'
import { User } from '../../types'
import { validateEmail } from '../../utils/validate'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState<User>({
    email: '',
    password: '',
  })

  const [hideError, setHideError] = useState<string>('invisible')

  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const property = e.target.name
    const value = e.target.value
    setForm({ ...form, [property]: value })
  }

  const mailHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setHideError(validateEmail(e.target.value))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (hideError && form.email && form.password) {
      await axios
        .post('http://localhost:3001/login', form)
        .then((res) =>
          localStorage.setItem(
            'loggedUser',
            JSON.stringify({
              email: form.email,
              token: res.data.token,
              name: res.data.name,
            })
          )
        )
        .catch((e) => console.error(e))
      navigate('/bonds')
    }
  }

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">
            Accede a tu cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block font-bold leading-6 text-gray-500"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={changeHandler}
                  onBlur={mailHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div
                className={`relative block w-full p-3 mb-4 leading-5 ${hideError} text-white bg-red-500 rounded-lg opacity-100 font-regular`}
              >
                Invalid email
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block font-bold leading-6 text-gray-500"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={changeHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-blue-200 px-3 py-1.5 text-sm font-bold leading-6  shadow hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
