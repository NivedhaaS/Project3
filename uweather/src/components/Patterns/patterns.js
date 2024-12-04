import React from 'react';
import sun from "../../assets/sun.png";
import "./patterns.css";

const Patterns = () => {
    return ( 
        <section id="patterns">
            <img src={sun} alt="sun" className="pSun"/>
            <div className="pPattern">
                <span>weather patterns in [place]<hr className="phr"/></span>
                <span className="sub">yearly temperature changes:</span>
                <div className= "trend">
                    <span className="graph"></span> 
                    <span className="info"></span>
                </div>
                <span className="prec">yearly precipitation changes:</span>
                <div className= "trend2">
                    <span className="graph2"></span> 
                    <span className="info2"></span>
                </div>
            </div>
        </section>                                                                                          
    );
}

export default Patterns;
