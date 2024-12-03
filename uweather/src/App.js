import Navbar from "./components/Navbar/navbar";
import Description from "./components/Description/description";
import Hotspots from "./components/Hotspots/hotspots";
import Patterns from "./components/Patterns/patterns";
// import Map from "./components/Map/map";

function App() {
  return (
    <div>
      <Navbar/>
      <Description/>
      <Hotspots/>
      <Patterns/>
      {/* <Map/> */}
    </div>
  );
}

export default App;
