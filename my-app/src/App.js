import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import EditInventory from "./components/EditInventory";
import SignUp from "./components/SignUp"
import Login from './components/Login';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/EditInventory" element={<EditInventory />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
