import React from 'react';
import sun from "../../assets/sun.png";
import "./patterns.css";

const Patterns = () => {
    return (
        <section id="patterns">
            <img src={sun} alt="sun" className="sun"/>
            <div className="hPattern" >
                <span>weather patterns in [place] ---------------------------------</span>
            </div>
        </section>                                                                                          
    );
}

export default Patterns;
