import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddSweet from "./pages/AddSweet";
import UpdateSweet from "./pages/UpdateSweet";
import Author from "./pages/Author";
import Footer from "./components/Footer";
import PurchaseHistory from "./pages/PurchaseHistory";

export default function App() {
  return (
    <>
     
      <Navbar />
      <Routes>
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/" element={<Author/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddSweet />} />
        <Route path="/update/:id" element={<UpdateSweet />} />
        <Route path="/history" element={<PurchaseHistory />} />
      </Routes>
    </>
  );
}
