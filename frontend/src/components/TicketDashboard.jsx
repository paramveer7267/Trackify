import React from 'react';

const TicketDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ticket Summary */}
        <div className="bg-white p-4 shadow rounded-md">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold">Total Tickets</div>
            <div className="text-4xl font-bold text-blue-600">3</div>
          </div>
        </div>

        {/* New and Resolved Tickets */}
        <div className="bg-white p-4 shadow rounded-md">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold">New Tickets</div>
            <div className="text-4xl font-bold text-gray-600">0</div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold">In Progress</div>
            <div className="text-4xl font-bold text-yellow-500">0</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Resolved</div>
            <div className="text-4xl font-bold text-green-600">3</div>
          </div>
        </div>

        {/* Engineer Overview */}
        <div className="bg-white p-4 shadow rounded-md">
          <div className="text-lg font-semibold mb-4">Engineers Overview</div>
          <div className="flex justify-between">
            <div>
              <div className="font-semibold text-gray-800">,,xz zdv</div>
              <div className="text-sm text-gray-500">software</div>
            </div>
            <div className="text-sm text-gray-600">3 tickets</div>
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-white p-4 shadow mt-6 rounded-md">
        <div className="flex justify-between mb-4">
          <div className="text-lg font-semibold">Recent Tickets</div>
          <a href="#" className="text-blue-600 hover:underline">View all tickets</a>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="font-semibold text-gray-800">Ticket {index + 1}</div>
              <div className="text-sm text-green-600">Resolved</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketDashboard;
