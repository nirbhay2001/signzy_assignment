function FriendRequests({ requests }) {
  const handleRequest = async (requestId, status) => {
    try {
      const response = await fetch(
        `https://signzy-assignment-1f09.onrender.com/api/friends/request/${requestId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ status })
        }
      );
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error handling friend request:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Friend Requests</h2>
      <div className="space-y-4">
        {requests.map(request => (
          <div
            key={request._id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div>
              <h3 className="font-semibold">{request.from.username}</h3>
              <p className="text-gray-600">{request.from.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleRequest(request._id, 'accepted')}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleRequest(request._id, 'rejected')}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
        {requests.length === 0 && (
          <p className="text-gray-500">No pending requests</p>
        )}
      </div>
    </div>
  );
}

export default FriendRequests; 