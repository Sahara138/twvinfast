import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Ensure Chart.js components are registered a single time before any charts mount
import './lib/chartjs'
import {  RouterProvider } from 'react-router'
import { router } from './provider/router.tsx'
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { FaSpinner } from 'react-icons/fa'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <PersistGate loading={<FaSpinner />} persistor={persistor}>
          <RouterProvider router={router} />
          <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              theme="light"
              transition={Bounce}
            />
        </PersistGate>
    </Provider>
  </StrictMode>,
)
