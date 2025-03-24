import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/friends/recommendations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
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
        setRecommendations(recommendations.filter(rec => rec._id !== userId));
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Recommended Friends</h2>
      <div className="space-y-4">
        {recommendations.map(recommendation => (
          <div
            key={recommendation._id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div>
              <h3 className="font-semibold">{recommendation.username}</h3>
              <p className="text-gray-600">{recommendation.email}</p>
              <p className="text-sm text-gray-500">
                {recommendation.mutualFriendsCount} mutual friends
              </p>
            </div>
            <button
              onClick={() => sendFriendRequest(recommendation._id)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Friend
            </button>
          </div>
        ))}
        {recommendations.length === 0 && (
          <p className="text-gray-500">No recommendations available</p>
        )}
      </div>
    </div>
  );
}

export default Recommendations; 