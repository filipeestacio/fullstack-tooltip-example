import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Exercise1 from './Exercise1.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Exercise1 />
  </StrictMode>,
)
