import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n'
import LoadingSpinner from './components/LoadingSpinner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-[#F5F7FB] dark:bg-slate-950"><LoadingSpinner size="large" /></div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
