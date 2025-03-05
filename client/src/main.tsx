import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
// import App from './App.tsx'
// import Root from './routes/root'
// import Contact from './routes/contact'
import ErrorPage from './errorPage'
import {
  Bonds,
  Detail,
  Create,
  Login,
  List,
  Portfolio,
  Cashflow,
} from './routes'
import { NavBar } from './components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Register from './routes/Register/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/bonds',
        element: <List />,
      },
      {
        path: '/bonds/:list',
        element: <Bonds />,
      },
      {
        path: '/bonds/detail/:tickerUSD',
        element: <Detail />,
      },
      {
        path: '/create',
        element: <Create />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/portfolio',
        element: <Portfolio />,
      },
      {
        path: '/cashflow',
        element: <Cashflow />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
