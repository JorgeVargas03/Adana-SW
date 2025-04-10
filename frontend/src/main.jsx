import React from 'react'
import ReactDOM from 'react-dom/client'
import AppAllModules from './AppAllModules';
import { PricesProvider } from "./ecommerce/prices/contexto/PricesProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PricesProvider>
      <AppAllModules />
    </PricesProvider>
  </React.StrictMode>,
)
