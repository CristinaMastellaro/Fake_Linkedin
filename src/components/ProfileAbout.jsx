import React from "react";

const ProfileAbout = ({ bio }) => {
  if (!bio) return null;

  return (
    <div className="profile-about">
      <h3>About</h3>
      <p>{bio}</p>
    </div>
  );
};

export default ProfileAbout;
