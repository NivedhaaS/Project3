import React from 'react';
import sun from "../../assets/sun.png";
import "./patterns.css";

const Patterns = () => {
    return ( 
        <section id="patterns">
            <img src={sun} alt="sun" className="pSun"/>
            <div className="pPattern" >
                <span>weather patterns in [place]<hr className="phr"/></span>
                <span className="sub">yearly temperature changes</span>
                <span className="trend">i</span> 
            </div>
        </section>                                                                                          
    );
}

export default Patterns;
