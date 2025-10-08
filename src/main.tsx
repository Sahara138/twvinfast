import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Ensure Chart.js components are registered a single time before any charts mount
import './lib/chartjs'
import {  RouterProvider } from 'react-router'
import { router } from './provider/router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
