import React, { useState } from 'react'
import {
  validateEmail,
  validateName,
  validatePassword,
  validateRepeatPassword,
} from '../../utils/validate'
import { Regist } from '../../types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState<Regist>({
    name: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  const [hideError, setHideError] = useState<Regist>({
    name: 'invisible',
    surname: 'invisible',
    email: 'invisible',
    password: 'invisible',
    repeatPassword: 'invisible',
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const property = e.target.name
    const value = e.target.value
    setForm({ ...form, [property]: value })
  }

  const nameHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setHideError({
      ...hideError,
      [e.target.name]: validateName(e.target.value),
    })
  }

  const mailHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setHideError({ ...hideError, email: validateEmail(e.target.value) })
  }

  const passwordHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setHideError({ ...hideError, password: validatePassword(e.target.value) })
  }

  const repeatPasswordHandler = () => {
    setHideError({
      ...hideError,
      repeatPassword: validateRepeatPassword(
        form.password,
        form.repeatPassword
      ),
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let formPass = true

    for (const i in hideError) {
      if (hideError[i as keyof Regist] !== 'invisible') {
        formPass = false
      }
    }

    if (formPass) {
      axios
        .post('http://localhost:3001/users', {
          user: {
            name: form.name,
            surname: form.surname,
            email: form.email,
            password: form.password,
            category: 'user',
          },
        })
        .then(() => {
          navigate('/login')
        })
        .catch((e) => {
          if (e.response.data.meta.target[0] === 'email') {
            alert('Email ya utilizado')
          } else {
            console.error(e)
            navigate('/bonds')
          }
        })
    } else {
      alert('Verificar información ingresada')
    }
  }

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">
            Registro de usuario
          </h2>
        </div>

        <div className="mt-10">
          <form
            className="flex flex-col items-center space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="flex">
              <label
                htmlFor="email"
                className="font-bold w-36 text-end pr-2 leading-6 text-gray-500"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                onChange={changeHandler}
                onBlur={nameHandler}
                className="rounded-md border-0 w-56 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <div
                className={` text-white bg-red-500 ${hideError.name} w-40 rounded-lg opacity-100 font-regular px-2 ml-2`}
              >
                Min 4 char
              </div>
            </div>
            <div className="flex">
              <label
                htmlFor="email"
                className="font-bold w-36 text-end pr-2 leading-6 text-gray-500"
              >
                Surname
              </label>

              <input
                id="surname"
                name="surname"
                type="text"
                autoComplete="surname"
                required
                onChange={changeHandler}
                onBlur={nameHandler}
                className="rounded-md border-0 w-56 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <div
                className={` text-white bg-red-500 ${hideError.surname} w-40 rounded-lg opacity-100 font-regular px-2 ml-2`}
              >
                Min 4 char
              </div>
            </div>
            <div className="flex">
              <label
                htmlFor="email"
                className="font-bold w-36 text-end pr-2 leading-6 text-gray-500"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                onChange={changeHandler}
                onBlur={mailHandler}
                className="rounded-md border-0 w-56 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <div
                className={` text-white bg-red-500 ${hideError.email} w-40 rounded-lg opacity-100 font-regular px-2 ml-2`}
              >
                Invalid email
              </div>
            </div>
            <div className="flex">
              <label
                htmlFor="password"
                className="font-bold w-36 text-end pr-2 leading-6 text-gray-500"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                onChange={changeHandler}
                onBlur={passwordHandler}
                className="rounded-md border-0 w-56 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <div
                className={` text-white bg-red-500 ${hideError.password} w-40 rounded-lg opacity-100 font-regular px-2 ml-2`}
              >
                Min 6 char
              </div>
            </div>
            <div className="flex">
              <label
                htmlFor="email"
                className="font-bold w-36 text-end pr-2 leading-6 text-gray-500"
              >
                Repeat Password
              </label>

              <input
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                required
                onChange={changeHandler}
                onBlur={repeatPasswordHandler}
                className="rounded-md border-0 w-56 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div
                className={` text-white bg-red-500 ${hideError.repeatPassword} w-40 rounded-lg opacity-100 font-regular px-2 ml-2`}
              >
                Different Password
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-blue-200 px-3 py-1.5 text-sm font-bold leading-6  shadow hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              >
                Crear usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
