import React from "react";
import sun from "../../assets/sun.png"; // Replace with your actual path
import map from "../../assets/usa.png"; // Replace with your actual path
import "./hotspots.css";

const Hotspots = () => {
  return (
    <section id="hotspots">
      <div className="container">
        <div className="hotspot-header">
          <img src={sun} alt="Sun" className="sun" />
          <span>
            Global Warming Hotspots
            <hr className="divider" />
          </span>
        </div>
        <img src={map} alt="Map" className="map" />
        <div className="controls">
          <label htmlFor="hotspot-count">How many hotspots to find:</label>
          <input
            type="number"
            id="hotspot-count"
            name="hotspot-count"
            placeholder="##"
            className="input-box"
          />
          <div className="buttons">
            <button className="button">Heap</button>
            <button className="button">Table</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hotspots;
