import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const Dashboard = ({ sidebarOpen, isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Dummy data
  const stats = {
    total: 120,
    verified: 85,
    pending: 35,
  };

  const recentCertificates = [
    { id: 1, name: 'John Doe', course: 'CSE', status: 'Verified' },
    { id: 2, name: 'Jane Smith', course: 'BCA', status: 'Pending' },
    { id: 3, name: 'Ali Khan', course: 'ECE', status: 'Verified' },
  ];

  const blacklistedUsers = [
    { id: 1, name: 'Robert Brown', reason: 'Fraudulent certificate' },
    { id: 2, name: 'Emily White', reason: 'Multiple submission violations' },
  ];

  const certificateTrends = [
    { month: 'Jan', verified: 40, pending: 10 },
    { month: 'Feb', verified: 45, pending: 15 },
    { month: 'Mar', verified: 50, pending: 20 },
    { month: 'Apr', verified: 60, pending: 25 },
    { month: 'May', verified: 55, pending: 18 },
    { month: 'Jun', verified: 70, pending: 10 },
  ];

  return (
    <div className={`pt-6 w-screen h-screen bg-slate-100 ${sidebarOpen && !isMobile ? 'left-[250px] w-[calc(100vw-249px)]' : !isMobile ? 'left-[70px] w-[calc(100vw-69px)]' : 'left-0 w-full'}`}>
      {/* Navbar */}
      <nav className={`fixed top-0 right-0 h-[70px] bg-white border-b border-gray-200 shadow z-50 transition-all duration-300 ease-in-out
        ${sidebarOpen && !isMobile ? 'left-[250px] w-[calc(100vw-250px)]' : !isMobile ? 'left-[70px]' : 'left-0 w-full'}`}>
        <div className="flex items-center justify-between h-full px-6 sm:px-8">
          <div>
            <h1 className="text-xl font-bold text-blue-900 ml-12 sm:ml-0">EduAuth</h1>
          </div>
          <div className="max-w-50 ml-8 sm:max-w-sm sm:ml-10">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative flex items-center bg-gray-100 border border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search certificates"
                  aria-label="Search"
                  className="max-w-20 sm:max-w-sm px-4 py-2 text-sm text-gray-700 bg-transparent placeholder-gray-400 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="p-2 bg-blue-900 text-white hover:bg-blue-700 transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className={`overflow-y-auto  ${sidebarOpen && !isMobile ? 'left-[250px] w-[calc(100vw-250px)]' : !isMobile ? 'left-[70px] w-[calc(100vw-70px)]' : 'left-0 w-full'}`}   >
        <div className="p-4 sm:p-6 space-y-6">
          {/* Statistics Cards */}
          <div className="sm:w-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Total Certificates" value={stats.total} />
            <StatCard title="Verified Certificates" value={stats.verified} />
            <StatCard title="Pending Certificates" value={stats.pending} />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Certificate Trends</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={certificateTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="verified" stroke="#2563eb" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="pending" stroke="#f59e0b" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Verification Breakdown</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={certificateTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="verified" fill="#2563eb" />
                  <Bar dataKey="pending" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Certificates */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Certificates</h2>
            <div className="space-y-3">
              {recentCertificates.map((cert) => (
                <div key={cert.id} className="flex justify-between items-center bg-gray-50 rounded p-3 hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-700">{cert.name}</p>
                    <p className="text-sm text-gray-500">{cert.course}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    cert.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Blacklisted Users */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Blacklisted Users</h2>
            <div className="space-y-3">
              {blacklistedUsers.map((user) => (
                <div key={user.id} className="flex justify-between items-center bg-red-50 rounded p-3 hover:bg-red-100 transition-colors">
                  <div>
                    <p className="font-medium text-red-800">{user.name}</p>
                    <p className="text-sm text-red-600">{user.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

// Statistic Card Component
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-4 sm:p-6">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="mt-2 text-2xl font-bold text-blue-900">{value}</p>
  </div>
);

export default Dashboard;
