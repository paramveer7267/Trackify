import React, { useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useTicketStore } from "../store/ticketStore";
import { Link } from "react-router-dom";
import { Timer,FlagIcon } from "lucide-react";
const MyTickets = () => {
  const { fetchUserTickets, tickets } = useTicketStore();

  useEffect(() => {
    fetchUserTickets();
  }, []);

  return (
    <DashboardLayout pageTitle={"My Tickets"}>
      <div className="p-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tickets</h2>
          <Link
            to="/dashboard/tickets/create"
            className="bg-[#5585CE] hover:bg-[#5585CE]/90 text-white text-sm px-4 py-2 rounded-md font-semibold flex items-center gap-1"
          >
            <span className="text-lg">＋</span> New Ticket
          </Link>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-4 text-xs tracking-wider uppercase font-sans ">
                  Ticket Title
                </th>
                <th className="px-4 py-4 text-xs font-sans uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-4 text-xs uppercase tracking-wider font-sans">
                  Category
                </th>
                <th className="px-4 py-4 text-xs uppercase tracking-wider font-sans">
                  Created Date
                </th>
                <th className="px-4 py-4 text-xs uppercase tracking-wider font-sans">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center font-semibold text-gray-500 py-4"
                  >
                    No tickets found.
                  </td>
                </tr>
              )}
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-t border-gray-300 hover:bg-gray-50"
                >
                  <td className="px-4 py-5">
                    <Link to={`/tickets/${ticket._id}`} className=" text-[#0F52BA]/70 hover:text-[#0F52BA]/90 font-semibold text-md">
                      {ticket?.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center text-md bg-blue-100 text-[#1E40B4] font-semibold px-2 py-1 rounded-full">
                      <Timer className="size-4 pr-1" /> {ticket?.status?.charAt(0).toUpperCase() +
          ticket?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-semibold">
                    {ticket.category}
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-semibold">
                    {new Date(
                      ticket.createdAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center bg-yellow-100 text-yellow-600 text-md px-2 py-1 rounded-full font-semibold">
                      <FlagIcon className="size-4 pr-1"/>{ticket.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyTickets;
