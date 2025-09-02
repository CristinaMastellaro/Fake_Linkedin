import React from "react";

const ProfileAnalytics = () => {
  return (
    <div className="profile-analytics">
      <div className="analytics-item">
        <h4>Analisi</h4>
        <p>0 visualizzazioni del profilo</p>
      </div>
      <div className="analytics-item">
        <h4>Impressioni</h4>
        <p>0 impressioni dei post</p>
      </div>
      <button className="btn-link">Mostra tutte le analisi</button>
    </div>
  );
};

export default ProfileAnalytics;
