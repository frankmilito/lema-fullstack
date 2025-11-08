import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryProvider } from '@app/providers/QueryProvider'
import { AppRoutes } from '@app/router/AppRoutes'
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from '@shared/components/feedback/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <StrictMode>
      <ErrorBoundary>
        <Toaster />
        <AppRoutes />
      </ErrorBoundary>
    </StrictMode>
  </QueryProvider>
)
