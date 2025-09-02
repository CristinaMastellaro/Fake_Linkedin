import { useState } from "react";
import "../css/messaggistica.css";

const Messaggistica = () => {
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  const toggleMessages = () => {
    setIsMessagesOpen(!isMessagesOpen);
  };

  return (
    <>
      {!isMessagesOpen && (
        <button className="messaggistica-button" onClick={toggleMessages}>
          Messaggistica
        </button>
      )}
      {isMessagesOpen && (
        <div className="messages-dropdown">
          <div className="messages-header">
            <div className="messages-title">
              <img
                src="https://static-exp1.licdn.com/sc/h/1bt1uwq5akv756knzdj4l6cdc"
                alt="User Avatar"
                className="messages-avatar"
              />
              <span>Messaggistica</span>
            </div>
            <div className="messages-header-actions">
              <button className="icon-button" title="Impostazioni">
                &#9881;
              </button>
              <button className="icon-button" title="Espandi">
                &#x25BC;
              </button>
              <button
                onClick={toggleMessages}
                className="close-button"
                title="Chiudi"
              >
                &times;
              </button>
            </div>
          </div>
          <div className="messages-search">
            <input type="text" placeholder="Cerca messaggi" />
            <button className="icon-button" title="Filtra">
              &#x1F50D;
            </button>
          </div>
          <div className="messages-content">
            <img
              src="https://static.licdn.com/aero-v1/sc/h/eeol4w9o9de2j4gq699mzx79d"
              alt="No messages illustration"
              className="messages-illustration"
            />
            <h4>Ancora nessun messaggio</h4>
            <p>
              Entra in contatto e dai il via a una conversazione per far
              decollare la tua carriera
            </p>
            <button className="btn-primary">Invia un messaggio</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Messaggistica;
