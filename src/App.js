import "./App.css";
import Planet from "./components/Planet";
import Resident from "./components/Resident";
import ResidentDetails from "./components/ResidentDetails";
import Navbar from "./components/Navbar";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App text-white">
      <h3 className="bg-yellow-500 flex justify-center py-4">
        <Link to={"/"}>
          <img src="/logo.png" alt="Star Wars" className="h-20 w-40" />
        </Link>
      </h3>
      <Navbar />
      <Routes>
        <Route path="/" element={<Planet />} />
        <Route path="/residents" element={<Resident />} />
        <Route path="/resident/:residentId" element={<ResidentDetails />} />
      </Routes>
    </div>
  );
}

export default App;
