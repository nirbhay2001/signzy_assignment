import { useState, useEffect } from 'react';
import UserSearch from './UserSearch';
import FriendsList from './FriendsList';
import FriendRequests from './FriendRequests';
import Recommendations from './Recommendations';
import { useAuth } from '../../context/AuthContext';

function Home() {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user) {
      setFriends(user.friends);
      setRequests(user.friendRequests.filter(req => req.status === 'pending'));
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UserSearch />
          <Recommendations />
        </div>
        <div className="space-y-6">
          <FriendRequests requests={requests} />
          <FriendsList friends={friends} />
        </div>
      </div>
    </div>
  );
}

export default Home; 