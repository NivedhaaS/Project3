import { useEffect } from "react";
import React, { useState } from "react";
import sun from "../../../assets/sun.png";
import map from "../../../assets/usa.png";
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

const Hotspots = ({ findHotspots, hotspotData }) => {
  const [plottedHotspots, setPlottedHotspots] = useState([]);
  const [duration, set_duration] = useState(0);


  const [hotspots, setHotspots] = useState("5");
  const [using_table, set_table] = useState(false);
  const [using_all, set_all] = useState(false);
  

  const handleFindHotspots = async () => {
    const numHotspots = parseInt(hotspots, 10);
    if (isNaN(numHotspots) || numHotspots <= 0) {
      alert("please enter a valid number of hotspots.");
      return;
    }

    const params = {numHotspots: numHotspots, structure: usingStructure(using_table), using_all: using_all};
    await findHotspots(params);
    
  };

  useEffect(() => {
    const formattedHotspots =  hotspotData?.data?.map((item) => ({
      lat: parseFloat(item.latitude),
      lng: parseFloat(item.longitude),
      name: item.name,
      rank: item.rank,
      state: item.state,
      tempIncrease: item["temp_incrs/yr"],
      month: item.month,
      day: item.day
    }));

    set_duration(hotspotData.duration || 0);
    setPlottedHotspots(formattedHotspots);
    }, [hotspotData]);

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


  {plottedHotspots?.map((hotspot, index) => (
    <React.Fragment key={index}>
      <div
        className="hotspot-marker"
        style={{
          top: `${calculateY(hotspot.lng)}%`,
          left: `${((130 + hotspot.lat) / 65) * 100}%`,
        }}
        data-location={`Latitude: ${hotspot.lat}
Longitude: ${hotspot.lng}
Name: ${hotspot.name}
State: ${hotspot.state}
Temp Increase: ${(hotspot.tempIncrease/100).toFixed(5)}°C/year
${using_all ? `Date: ${hotspot.month}/${hotspot.day}` : ""}`}
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
          />
        </label>
        <button className="find" onClick={handleFindHotspots}>
          find hotspots
        </button>
      </div>

      <div>
        <label className="togglecontainer">
          <input 
            type="checkbox"
            className="check"
            checked={using_all}
            onChange={(g) => set_all(g.target.checked)}></input>
          <span className="togglebackground">
            <div id="heapButton" className="toggletext">
              By Location
            </div>
            <div id="tableButton" className="toggletext">
              By Day
            </div>
          </span>
        </label>
        <label className="togglecontainer">
          <input 
            type="checkbox"
            className="check"
            checked={using_table}
            onChange={(f) => set_table(f.target.checked)}></input>
          <span className="togglebackground">
            <div id="heapButton" className="toggletext">
              Heap
            </div>
            <div id="tableButton" className="toggletext">
              Table
            </div>
          </span>
        </label>
      </div>
      <div className="time-display">{duration === 0 ? "" : `Took ${duration} ms`}</div>
    </section>
  );
};

export default Hotspots;
