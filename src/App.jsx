// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx"; 
import { Payment } from "./components/dashboard/Payment.jsx";



export default function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route
          path="/payment"
          element={
              <Payment />}/>
      </Routes>
    
  );
}
