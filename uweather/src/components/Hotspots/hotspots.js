import React from 'react';
import sun from "../../assets/sun.png";
import map from "../../assets/usa.png";
import "./hotspots.css";

const Hotspots = () => {
    return (
        <section id="hotspots">
            <div class="container">
                <img src={sun} alt="sun" className="sun"/>
                <div className="hHotspots" >
                    <span>global warming hotspots<hr className="hr"></hr></span>
                </div>
            </div>
            <img src={map} alt="map" className="map"/>
        </section> 
    )
}

export default Hotspots;
