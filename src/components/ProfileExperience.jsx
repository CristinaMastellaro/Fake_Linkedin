import React from "react";

const ProfileExperience = ({ experiences }) => {
  return (
    <div className="profile-experience">
      <h3>Esperienza</h3>
      {experiences && experiences.length > 0 ? (
        experiences.map((exp) => (
          <div key={exp._id} className="experience-item">
            <h4>{exp.role}</h4>
            <p>
              {exp.company} - {exp.area}
            </p>
            <p>
              {new Date(exp.startDate).toLocaleDateString()} -{" "}
              {exp.endDate
                ? new Date(exp.endDate).toLocaleDateString()
                : "Presente"}
            </p>
            <p>{exp.description}</p>
          </div>
        ))
      ) : (
        <p>Nessuna esperienza aggiunta</p>
      )}
      <button className="btn-link">Aggiungi esperienza</button>
    </div>
  );
};

export default ProfileExperience;
