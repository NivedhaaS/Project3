import React from 'react';
import sun from "../../assets/sun.png";
import "./patterns.css";

const Patterns = () => {
    return ( 
        <section id="patterns">
            <img src={sun} alt="sun" className="pSun" style={{transform: 'translate(40px, -70px)'}}/>
            <div className="pPattern">
                <span>weather patterns by day<hr className="phr"/></span>
                <span className="sub">temperature changes by day and location: ranked</span>
                <table className="graph">
                    <tr>
                        <th>Rank</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>State</th>
                        <th>Degrees °C</th>
                    </tr>
                    <tr>
                        <td >emrk</td>
                        <td>er</td>
                        
                    </tr>
                    <tr>
                        <td>ere</td>
                        <td>ere</td>
                    </tr>
                </table>
            </div>
        </section>                                                                                          
    );
}

export default Patterns;
