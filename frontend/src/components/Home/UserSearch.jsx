import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function UserSearch() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  const searchUsers = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/search?query=${query}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const sendFriendRequest = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/friends/request/${userId}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.ok) {
        setUsers(users.map(u => 
          u._id === userId 
            ? { ...u, requestSent: true }
            : u
        ));
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Find Friends</h2>
        <form onSubmit={searchUsers} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="input-field"
            />
            <button
              type="submit"
              className="btn-primary whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {users.map(searchedUser => (
            <div
              key={searchedUser._id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <h3 className="font-medium text-gray-800">{searchedUser.username}</h3>
                <p className="text-sm text-gray-500">{searchedUser.email}</p>
              </div>
              {!searchedUser.requestSent ? (
                <button
                  onClick={() => sendFriendRequest(searchedUser._id)}
                  className="btn-success text-sm"
                >
                  Add Friend
                </button>
              ) : (
                <span className="text-sm text-gray-500 px-3 py-1 bg-gray-100 rounded">
                  Request Sent
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserSearch; 