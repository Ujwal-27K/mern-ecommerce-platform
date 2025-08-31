import React from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { userInfo } = useSelector(state => state.auth);

  if (!userInfo) return <p>Loading user profile...</p>;

  return (
    <>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {userInfo.name}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      {/* Additional user profile info and update form can be added here */}
    </>
  );
};

export default ProfilePage;
