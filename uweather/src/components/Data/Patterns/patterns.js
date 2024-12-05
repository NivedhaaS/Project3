import React from 'react';
import sun from "../../../assets/sun.png";
import "./patterns.css";

const Patterns = ({hotspotData}) => {
    return ( 
        <section id="patterns">
            <img src={sun} alt="sun" className="pSun"/>
            <div className="pPattern">
                <span>weather patterns by day<hr className="phr"/></span>
                <span className="sub">temperature changes by day and location ranked</span>
                <div className='tablelabel'>
                    <div className='tablecontainer'>
                        <table className="graph">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <>
                                    {hotspotData?.data?.length > 0 && hotspotData.data[0]?.month && <th>Date</th>}
                                    </>
                                    <th>Name</th>
                                    <th>State</th>
                                    <th className='tempred'>°C/Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotspotData?.data?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.rank}</td>
                                    <>
                                    {item.month && <td>{`${item.month}/${item.day}`}</td>}
                                    </>
                                    <td>{item.name}</td>
                                    <td>{item.state}</td>
                                    <td className='tempred'>{(item["temp_incrs/yr"]/100).toFixed(5)}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className='tabletext'>Using data from NOAA dating back up to 1900, we have calculated an approximation of temperature increase per year for every day and location. We have also calculated the average temperature increase for each location to identify locations that are the most affected by global warming.<br/><br/>Our Dataset: <a href="https://www.ncei.noaa.gov/metadata/geoportal/rest/metadata/item/gov.noaa.ncdc:C00861/html">NOAA</a></p>
                </div>
            </div>
        </section>                                                                                          
    );
}

export default Patterns;
