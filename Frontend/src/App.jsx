import { router } from '../src/routes/App.routes'
import { RouterProvider } from 'react-router'
import AuthProvider from './features/auth/context/AuthContext'
import { ServerProvider } from './features/server/context/ServerContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const App = () => {
  return (
    <AuthProvider>
      <ServerProvider>
        <RouterProvider router={router} />
        <ToastContainer 
          position="bottom-right"
          theme="dark"
          autoClose={3000}
        />
      </ServerProvider>
    </AuthProvider>
  )
}

export default App