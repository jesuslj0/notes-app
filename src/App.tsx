import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import "remixicon/fonts/remixicon.css"
import { AuthRoutes } from './routes/AuthRoutes'
import { PrivateRoutes } from './routes/PrivateRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        {/* Rutas públicas */}
        <Route path="auth/*">
          {AuthRoutes()} 
        </Route>
        {/* Rutas privadas */}
        {PrivateRoutes()} 
      </Routes>
    </BrowserRouter>
  );
}

export default App
