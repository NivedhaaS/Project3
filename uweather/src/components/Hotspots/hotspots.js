import React, { useState } from "react";
import sun from "../../assets/sun.png";
import map from "../../assets/usa.png";
import "./hotspots.css";

function calculateY(lat) {
  function webMercatorY(latitude) {
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

function usingStructure(using_table){
  if (using_table) return "table";
  else return "heap";
}

const Hotspots = () => {
  const [hotspots, setHotspots] = useState("");
  const [plottedHotspots, setPlottedHotspots] = useState([]);
  const [using_table, set_table] = useState(false);

  const findHotspots = () => {
    const numHotspots = parseInt(hotspots, 10);
    const structure = usingStructure(using_table);
    if (isNaN(numHotspots) || numHotspots <= 0) {
      alert("please enter a valid number of hotspots.");
      return;
    }

    try{
    const response = fetch(`/api?hotspots=${numHotspots}&data_structure=${structure}`,{
      method: 'GET'
    })

    const hotspotData = response.json();

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
  }
  catch{}
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
    <React.Fragment key={index}>
      <div
        className="hotspot-marker"
        style={{
          top: `${calculateY(hotspot.lng)}%`,
          left: `${((130 + hotspot.lat) / 65) * 100}%`,
        }}
        data-location={`
        Lat: ${hotspot.lat}\n
        Lng: ${hotspot.lng}\n
        Name: ${hotspot.name}\n
        State: ${hotspot.state}\n
        Rank: ${hotspot.rank}\n
        Temp Increase: ${hotspot.tempIncrease.toFixed(2)}/yr`}
      >{hotspot.rank}</div>
    </React.Fragment>
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
            placeholder="5"
          />
        </label>
        <button className="find" onClick={findHotspots}>
          find hotspots
        </button>
      </div>

      <label className="togglecontainer">
        <input 
          type="checkbox"
          className="check"
          checked={using_table}
          onChange={(f) => set_table(f.target.checked)}></input>
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
