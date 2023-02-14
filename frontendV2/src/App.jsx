import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import HomePage from './pages/HomePage'
import Login from './pages/Login'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App bg-base-100">
      <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to='/login' />}
            />
          <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to='/' />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;

