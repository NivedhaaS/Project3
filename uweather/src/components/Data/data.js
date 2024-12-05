import React,  { useState } from 'react';
import Patterns from './Patterns/patterns';
import Hotspots from './Hotspots/hotspots';

const Data = () => {
    const [hotspotData, setHotspotData] = useState([]);


    const handleFindHotspots = async (params) => {
      try {
        const response = await fetch(`/api?hotspots=${params.numHotspots}&data_structure=${params.structure}${params.using_all ? "&data_mode=all" : ""}`,{
      method: 'GET'
    });
        const data = await response.json();
        await setHotspotData(data); // Update the shared state
      } catch (error) {
        console.error("Error fetching hotspots:", error);
      }
    };
  
    return (
      <div>
        <Hotspots findHotspots={handleFindHotspots} hotspotData={hotspotData} />
        <Patterns hotspotData={hotspotData} />
      </div>
    );
  };
  
  export default Data;