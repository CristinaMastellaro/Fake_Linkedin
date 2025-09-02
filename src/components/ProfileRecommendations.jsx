import React from "react";

const ProfileRecommendations = () => {
  return (
    <section className="profile-recommendations">
      <h3>Consigliato per te</h3>
      <div className="recommendation-card">
        <p>In quale settore lavori?</p>
        <p>
          Gli utenti nel settore con un titolo simile al tuo hanno visitato 2,5
          volte più visualizzazioni del profilo.
        </p>
        <button className="btn-primary">Aggiungi settore</button>
      </div>
      <div className="recommendation-card">
        <p>Aggiungi una foto al tuo profilo per aiutare altri a riconoscerti</p>
        <button className="btn-primary">Aggiungi foto</button>
      </div>
    </section>
  );
};

export default ProfileRecommendations;
