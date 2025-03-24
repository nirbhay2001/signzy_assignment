import { useAuth } from '../../context/AuthContext';

function FriendsList({ friends }) {
  const { user } = useAuth();

  const unfriendUser = async (friendId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/friends/unfriend/${friendId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error unfriending user:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Friends</h2>
      <div className="space-y-4">
        {friends.map(friend => (
          <div
            key={friend._id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div>
              <h3 className="font-semibold">{friend.username}</h3>
              <p className="text-gray-600">{friend.email}</p>
            </div>
            <button
              onClick={() => unfriendUser(friend._id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Unfriend
            </button>
          </div>
        ))}
        {friends.length === 0 && (
          <p className="text-gray-500">No friends yet</p>
        )}
      </div>
    </div>
  );
}

export default FriendsList; 