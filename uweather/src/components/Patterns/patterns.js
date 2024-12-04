import React from 'react';
import sun from "../../assets/sun.png";
import "./patterns.css";

const Patterns = () => {
    return ( 
        <section id="patterns">
            <img src={sun} alt="sun" className="pSun"/>
            <div className="pPattern">
                <span>weather patterns by day<hr className="phr"/></span>
                <span className="sub">temperature changes by day and location: ranked</span>
                <div className= "trend">
                    <span className="graph"></span> 
                    <span className="info"></span>
                </div>
            </div>
        </section>                                                                                          
    );
}

export default Patterns;
