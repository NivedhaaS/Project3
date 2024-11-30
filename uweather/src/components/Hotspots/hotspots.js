import React from 'react';
import sun from "../../assets/sun.png";
import "./hotspots.css";

const Hotspots = () => {
    return (
        <section id="hotspots">
            <img src={sun} alt="sun" className="sun"/>
            <div className="hHotspots" >
                <span>global warming hotspots -------------------------------</span>
            </div>
        </section>                                                                                          
    );
}

export default Hotspots;
