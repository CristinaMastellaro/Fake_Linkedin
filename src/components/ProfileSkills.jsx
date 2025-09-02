import React from "react";

const ProfileSkills = ({ skills }) => {
  return (
    <div className="profile-skills">
      <h3>Competenze</h3>
      {skills && skills.length > 0 ? (
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      ) : (
        <p>Nessuna competenza aggiunta</p>
      )}
      <button className="btn-link">Aggiungi competenza</button>
    </div>
  );
};

export default ProfileSkills;
