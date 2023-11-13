import React from "react";
import "./PageWaiters.css";

function PageWaiters() {
  return (
    <div className="page">
      <div className="content">
        <div className="WaitersTitle-container">
          <h1>Garçons</h1>
        </div>
        <div className="GarconsCadastrados">
          <h2>Garçons</h2> {/* Título */}
          <div className="content-container">
            <div className="NomeDosGarcons">
              <div className="top-text">
                <p>Dados dos Garçons</p>
                
              </div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageWaiters;
