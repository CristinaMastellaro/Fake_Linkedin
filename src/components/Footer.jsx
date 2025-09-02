import React from "react";

const Footer = () => {
  return (
    <footer className="profile-footer">
      <div className="footer-links">
        <a href="#about">Informazioni</a>
        <a href="#accessibility">Accessibilità</a>
        <a href="#help-center">Centro assistenza</a>
        <a href="#privacy">Privacy e condizioni</a>
        <a href="#ad-choices">Scelte pubblicitarie</a>
        <a href="#ad-choices">Pubblicità</a>
        <a href="#business-services">Servizi per le aziende</a>
        <a href="#ad-choices">Scarica l'app LinkedIn</a>
        <a href="#more">Altro</a>
      </div>
      <div className="footer-copy">
        <p>LinkedIn Corporation © 2023</p>
      </div>
      <div className="footer-language">
        <label htmlFor="language-select">Lingua:</label>
        <select id="language-select" name="language">
          <option value="it-IT">Italiano (Italia)</option>
          <option value="en-US">English (United States)</option>
        </select>
      </div>
    </footer>
  );
};

export default Footer;
