import React from "react";

const ProfileEducation = ({ education }) => {
  return (
    <div className="profile-education">
      <h3>Formazione</h3>
      {education && education.length > 0 ? (
        education.map((edu) => (
          <div key={edu._id} className="education-item">
            <h4>{edu.school}</h4>
            <p>{edu.degree}</p>
            <p>
              {new Date(edu.startDate).getFullYear()} -{" "}
              {edu.endDate ? new Date(edu.endDate).getFullYear() : "Presente"}
            </p>
          </div>
        ))
      ) : (
        <p>Nessuna formazione aggiunta</p>
      )}
      <button className="btn-link">Aggiungi formazione</button>
    </div>
  );
};

export default ProfileEducation;
