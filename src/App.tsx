import './App.css'
import { NotesContextProvider } from './context/NotesContext'
import { Dashboard } from './Dashboard'
import "remixicon/fonts/remixicon.css"

function App() {

  return (
    <>
      <NotesContextProvider>
        <Dashboard />
      </NotesContextProvider>
    </>
  )
}

export default App
