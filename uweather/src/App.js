import Navbar from "./components/Navbar/navbar";
import Description from "./components/Description/description";
import Data from "./components/Data/data"
import Footer from "./components/Footer/footer";



function App() {
  return (
    <div>
      <Navbar/>
      {/* <Section> */}
      <Description/>
      {/* </Section> */}
      {/* <Section> */}
      <Data/>
      {/* <Map/> */}
      <Footer/>
    </div>
  );
}

export default App;
