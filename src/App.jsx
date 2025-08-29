// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx"; 
import  {Payment}  from "./components/dashboard/Payment.jsx";
import Contact from "./pages/Contact.jsx";
import AdminLogin from "./pages/Adminlogin.jsx";
import AdminDashboard from "./pages/Admindashboard.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Courses from "./pages/Courses.jsx";
import Hackathons from "./pages/Hackathons.jsx";
import CoursesGrid from "./components/dashboard/CourseGrid.jsx";
import CourseDetailsPage from "./components/dashboard/CourseDetailsPage.jsx";

export default function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route
          path="/payment"
          element={
              <Payment />}/>
              <Route path="/contact" element={<Contact />} />
              <Route path="Courses" element={<Courses />} />
              <Route path="Hackathons" element={<Hackathons />} />
              <Route path="/courses" element={<CoursesGrid />} />
              <Route path="/courses/:id" element={<CourseDetailsPage />} />

              <Route path="/admin-login" element={<AdminLogin />} />
               <Route
                 path="/admin"
                element={
                <AdminRoute>
                   <AdminDashboard />
                </AdminRoute>
                }
/>
      </Routes>
    
  );
}
