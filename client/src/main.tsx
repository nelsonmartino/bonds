import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
// import App from './App.tsx'
// import Root from './routes/root'
// import Contact from './routes/contact'
import ErrorPage from './errorPage'
import { Bonds, Detail } from './routes'
import { NavBar } from './components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Landing />,
  //   errorElement: <ErrorPage />,
  // },
  // {
  //   path: '/bonds',
  //   element: <NavBar />,
  //   children: [
  //     {
  //       path: '/bonds/list',
  //       element: <Bonds />,
  //     },
  //     {
  //       path: '/bonds/:tickerUSD',
  //       element: <Detail />,
  //     },
  //   ],
  // },
  {
    path: '/',
    element: <NavBar />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: '/bonds',
      //   element: <Landing />,
      // },
      {
        path: '/bonds/list',
        element: <Bonds />,
      },
      {
        path: '/bonds/:tickerUSD',
        element: <Detail />,
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
