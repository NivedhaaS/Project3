import React, { useState } from "react";
import sun from "../../assets/sun.png";
import map from "../../assets/usa.png";
import "./hotspots.css";
import hotspotData from "./test.json";

function calculateY(lat){
    function webMercatorY(latitude){
        const radLat = (latitude * Math.PI) / 180;
        return Math.log(Math.tan(Math.PI / 4 + radLat / 2));
    }

    const yMin = webMercatorY(22);
    const yMax = webMercatorY(50);

    const yMercator = webMercatorY(lat);

    const yNormalized = (yMercator - yMin) / (yMax - yMin);
    const yPercentage = (1 - yNormalized) * 100;
    console.log(yPercentage);
    return yPercentage;
}

const Hotspots = () => {
  const [hotspots, setHotspots] = useState(""); 
  const [plottedHotspots, setPlottedHotspots] = useState([]); 

  const findHotspots = () => {
    const numHotspots = parseInt(hotspots, 10); 
    if (isNaN(numHotspots) || numHotspots <= 0) {
      alert("please enter a valid number of hotspots.");
      return;
    }

    const formattedHotspots = hotspotData.data.map((item) => ({
      lat: parseFloat(item.latitude), 
      lng: parseFloat(item.longitude), 
      name: item.name,
      rank: item.rank,
      state: item.state,
      tempIncrease: item["temp_incrs/yr"],
      duration: item["duration"], 
    }));

    const selectedHotspots = formattedHotspots.slice(0, numHotspots);
    setPlottedHotspots(selectedHotspots);
  };

  return (
    <section id="hotspots">
      <div className="container">
        <img src={sun} alt="sun" className="Hsun" />
        <div className="hHotspots">
          <span>
            global warming hotspots
            <hr className="hr" />
          </span>
        </div>
      </div>

      <div className="map-container">
        <img src={map} alt="map" className="map" />
        {plottedHotspots.map((hotspot, index) => (
          <div
            key={index}
            className="hotspot-marker"
            style={{
            //   top: `${((50 - hotspot.lng)/28) * 100}%`,
              top: `${calculateY(hotspot.lng)}%`,
              left: `${((130 + hotspot.lat)/65) * 100}%`, 
            }}
            title={`Name: ${hotspot.name}\nState: ${hotspot.state}\nRank: ${hotspot.rank}\nTemp Increase: ${hotspot.tempIncrease.toFixed(
              2
            )}/yr\nDuration: ${hotspot.duration}`}
          ></div>
        ))}
      </div>

      <div className="interaction_container">
        <label className="fj">
          how many hotspots to find:
          <input
            type="text"
            className="input_box"
            value={hotspots}
            onChange={(e) => setHotspots(e.target.value)}
            placeholder="##"
          />
        </label>
        <button className="find" onClick={findHotspots}>
          find hotspots
        </button>
      </div>

      <label class="togglecontainer">
        <input type="checkbox" className="check"></input>
        <span className="togglebackground">
          <div id="heapButton" className="toggletext">
            heap
          </div>
          <div id="tableButton" className="toggletext">
            table
          </div>   
        </span>
        
      </label>
      <div className="time-display"> </div>
    </section>
  );
};

export default Hotspots;
