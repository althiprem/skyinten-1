// src/pages/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton"

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="absolute top-6" style={{ right: '2in' }}>
              <BackButton />
            </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <href className="p-6 bg-white rounded shadow">📊 Manage Users</href>
        <div className="p-6 bg-white rounded shadow">📚 Manage Courses</div>
        <div className="p-6 bg-white rounded shadow">⚙️ Settings</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
