import Navbar from "./components/Navbar/navbar";
import Description from "./components/Description/description";
import Hotspots from "./components/Hotspots/hotspots";
import Patterns from "./components/Patterns/patterns";
// import Map from "./components/Map/map";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// const Section = ({ children }) => {
//   const [ref, inView] = useInView({
//     triggerOnce: false,
//     threshold: 0.4, 
//   });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 100 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5 }}
//     >
//       {children}
//     </motion.div>
//   );
// };

function App() {
  return (
    <div>
      <Navbar/>
      {/* <Section> */}
      <Description/>
      {/* </Section> */}
      {/* <Section> */}
      <Hotspots/>
      {/* </Section> */}
      <Patterns/>
      {/* <Map/> */}
    </div>
  );
}

export default App;
