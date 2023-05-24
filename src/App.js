import './App.css';
import {Route, Routes} from "react-router-dom";
import Challenges from "./components/Challenges";
import Landing from "./components/Landing"
function App() {
  return (
    <Routes>
        <Route path="/" element = {<Challenges />} />
        <Route path="/problems" element = {<Landing />} />
    </Routes>
  );
}

export default App;
