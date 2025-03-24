import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >
            FriendNest
          </Link>
          <div>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 hidden sm:inline">
                  Welcome, {user.username}
                </span>
                <button
                  onClick={logout}
                  className="btn-danger text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-3">
                <Link
                  to="/login"
                  className="btn-primary text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 