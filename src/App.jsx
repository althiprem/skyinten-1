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
import Features from "./pages/Features.jsx";
import Privacy from "./pages/Privacy.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";


export default function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }  */}
         <Route
          path="/payment"
          element={
              <Payment />}/>
              <Route path="/contact" element={<Contact />} />
              <Route path="Courses" element={<Courses />} />
              <Route path="Hackathons" element={<Hackathons />} />
              <Route path="/features" element={<Features />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/courses" element={<CoursesGrid />} />
              <Route path="/course/:id" element={<CourseDetails />} />

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
