import React from "react";

const ProfileHeader = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="profile-header">
      <div className="profile-image">
        <img src={profile.image} alt={`${profile.name} ${profile.surname}`} />
      </div>
      <div className="profile-info">
        <h1>
          {profile.name} {profile.surname}
        </h1>
        <h2>{profile.title}</h2>
        <p>{profile.area}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
