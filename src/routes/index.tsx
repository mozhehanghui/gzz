import Page404 from 'pages/Page404'
import { Navigate } from 'react-router-dom'
import Main from 'pages/Main'
import Draw from 'pages/Draw'
import Home from 'pages/Home'
import { Preview } from 'pages/Preview'

export const routerConfig = [
  {
    path: '/',
    element: <Main />,
    children: [
      { element: <Navigate to="/home" />, index: true },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/draw',
        element: <Draw />,
      },
      {
        path: '/preview',
        element: <Preview />,
      },
      { path: '404', element: <Page404 /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]
