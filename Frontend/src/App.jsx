import React from 'react'
import { router } from '../src/routes/App.routes'
import { RouterProvider } from 'react-router'
import AuthProvider from './features/auth/context/AuthContext'
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App