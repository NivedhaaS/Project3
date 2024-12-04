import React from 'react';
import { useState } from 'react';
import sun from "../../assets/sun.png";
import map from "../../assets/usa.png";
import "./hotspots.css";

const Hotspots = () => {
    const [hotspots, setHotspots] = useState("");
    const [timeTaken, setTimeTaken] = useState("");

    const findHotspots = () => {
        const startTime = performance.now();
        console.log(`Finding ${hotspots} hotspots...`);
        setTimeout = () => {
            const endTime = performance.now();
            setTimeTaken(`${(endTime - startTime).toFixed(2)} ms`);
        }
    }

    return (
        <section id="hotspots">
            <div class="container">
                <img src={sun} alt="sun" className="Hsun"/>
                <div className="hHotspots" >
                    <span>global warming hotspots<hr className="hr"></hr></span>
                </div>
            </div>
            <img src={map} alt="map" className="map"/>
            <div className="interaction_container">
                <label className="fj">
                    how many hotspots to find:
                     <input
                        type="text"
                        className="input_box"
                        value={hotspots}
                        onChange={(e) => setHotspots(e.target.value)}
                        placeholder="xx"
                    />
                </label>

                <button className="find" onClick={findHotspots}>
                    Find Hotspots
                </button>
                <div className="button">
                    <button className="heap_button">Heap</button>
                    <button className="table_button">Table</button>
                </div>
            </div>
        </section> 

    )
}

export default Hotspots;
