import React from 'react';
import './description.css';
import earth from "../../assets/earth.png";

const Description = () => {
    return (
        <section id="description">
            <img src={earth} alt="earth" className="earth"/>
            <div className="part2">
                <span>ür friendly guide to understanding global warming, one <span className="temp">temperature</span> trend at a time.</span>
            </div>
        </section>                                                                                          
    );
};

export default Description;
