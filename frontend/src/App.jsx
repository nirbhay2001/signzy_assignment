import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import Navbar from './components/Layout/Navbar';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100"> 
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
