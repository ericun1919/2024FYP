import "./App.css";
import Landing from "./components/Landing";
import Challenges from "./components/Challenges";
import {Route, Routes} from "react-router-dom";
import "./lib/i18n";
function App() {
  
  return (

    <Routes>
          <Route path="/" element = {<Challenges />} />
          <Route path="/problems" element = {<Landing />} />
      </Routes>
)
  // return(<Landing />)
}

export default App;
