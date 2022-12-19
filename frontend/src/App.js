import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import HomePage from './pages/HomePage'

function App() {
  const { user } = useAuthContext()



  return (
    <div className="App bg-base-100">
      <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;







