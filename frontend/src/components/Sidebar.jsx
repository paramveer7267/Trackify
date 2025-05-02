import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  LayoutDashboard,
  TicketCheck,
  Users,
  Settings,
  LogOut,
  PlusCircle,
} from 'lucide-react';

const Sidebar = ({ isMobile, toggleSidebar }) => {
   const {user,userLogout} = useAuthStore();
   const currentUser = user;
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
      isActive
        ? 'bg-primary-700 text-white'
        : 'text-gray-200 hover:bg-primary-700/50'
    }`;

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-primary-800 text-white transform transition-transform duration-300 ease-in-out ${
        isMobile ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-primary-700">
          <div className="flex items-center justify-center">
            <TicketCheck className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold">TicketPro CRM</span>
          </div>
        </div>

        <div className="px-3 py-4 flex-1 overflow-y-auto">
          <nav className="space-y-1">
            <NavLink
              to="/dashboard"
              className={navLinkClass}
              onClick={() => isMobile && toggleSidebar()}
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </NavLink>

            {currentUser?.role === 'admin' && (
              <NavLink
                to="/users"
                className={navLinkClass}
                onClick={() => isMobile && toggleSidebar()}
              >
                <Users className="mr-3 h-5 w-5" />
                Users & Engineers
              </NavLink>
            )}

            {currentUser?.role === 'client' && (
              <NavLink
                to="/tickets/new"
                className={navLinkClass}
                onClick={() => isMobile && toggleSidebar()}
              >
                <PlusCircle className="mr-3 h-5 w-5" />
                Create Ticket
              </NavLink>
            )}

            <NavLink
              to="/settings"
              className={navLinkClass}
              onClick={() => isMobile && toggleSidebar()}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </NavLink>
          </nav>
        </div>

        <div className="p-4 border-t border-primary-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                {currentUser?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {currentUser?.name}
              </p>
              <p className="text-xs text-gray-300 capitalize">
                {currentUser?.role}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-3 w-full flex items-center justify-center px-4 py-2 text-sm text-white bg-primary-700 rounded-md hover:bg-primary-600 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
