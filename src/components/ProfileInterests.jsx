import React from "react";

const ProfileInterests = ({ interests }) => {
  return (
    <div className="profile-interests">
      <h3>Interessi</h3>
      {interests && interests.length > 0 ? (
        <ul>
          {interests.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      ) : (
        <p>Nessun interesse aggiunto</p>
      )}
      <button className="btn-link">Mostra tutte le aziende</button>
    </div>
  );
};

export default ProfileInterests;
