import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from "@vercel/speed-insights/react";
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import {Provider} from 'react-redux'
import App from './App.tsx'
import {store} from '../src/store/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>

    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
