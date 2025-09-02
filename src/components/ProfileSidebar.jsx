import React from "react";

const ProfileSidebar = () => {
  return (
    <aside className="profile-sidebar">
      <section className="profile-language">
        <h4>Lingua del profilo</h4>
        <i class="bi bi-pencil"></i>
      </section>
      <section className="profile-public-url">
        <h4>Profilo pubblico e URL</h4>
        <button className="btn-link">Personalizza</button>
      </section>
      <section className="profile-people-you-may-know">
        <h4>Persone che potresti conoscere</h4>
        <ul>
          <li>
            <span>Aldo Baglio</span>
            <button className="btn-link">Collegati</button>
          </li>
          <li>
            <span>Giovanni Storti</span>
            <button className="btn-link">Collegati</button>
          </li>
          <li>
            <span>Dottor Giacomo Maria Poretti</span>
            <button className="btn-link">Collegati</button>
          </li>
          <li>
            <span>Pdor Figlio di Kmer</span>
            <button className="btn-link">Collegati</button>
          </li>
          <li>
            <span>Ingegner Cane</span>
            <button className="btn-link">Collegati</button>
          </li>
        </ul>
      </section>
      <section className="profile-ads">
        <img
          src="https://media.licdn.com/media/AAYABATPAAgAAQAAAAAAAKwYrfHUPkoBQGmwnaG71Ps_5Q.png"
          alt="See who's hiring"
          style={{ maxWidth: "100%", height: "auto", maxHeight: "150px" }}
        />
      </section>
    </aside>
  );
};

export default ProfileSidebar;
