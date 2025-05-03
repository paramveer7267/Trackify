import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
export const useTicketStore = create((set) => ({
  tickets: [],
  assignedTickets: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isFetching: false,
  createTicket: async (ticketData) => {
    set({ isCreating: true });
    try {
      const res = await axios.post(
        "/api/v1/dashboard/create",
        ticketData
      );
      set((state) => ({
        tickets: [...state.tickets, res.data.ticket],
        isCreating: false,
      }));
      toast.success("Ticket created successfully");
      return res.data.ticket;
    } catch (error) {
      console.error("Create Ticket Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Ticket creation failed"
      );
      set({ isCreating: false });
    }
  },
  fetchUserTickets: async () => {
    set({ isFetching: true });
    try {
      const res = await axios.get("/api/v1/dashboard/user");
      set({ tickets: res.data.tickets, isFetching: false });
    } catch (error) {
      console.error("Fetch Tickets Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch tickets"
      );
      set({ isFetching: false });
    }
  },
  fetchAssignedTickets: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(
        "/api/v1/dashboard/assigned-tickets"
      );
      set({
        assignedTickets: res.data.tickets,
        isLoading: false,
      });
    } catch (error) {
      console.error("Fetch Tickets Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch tickets"
      );
      set({ isLoading: false });
    }
  },
  updateTicket: async (id, updates) => {
    set({ isUpdating: true });
    try {
      const res = await axios.patch(`/api/v1/dashboard/${id}/status`, updates);
      const updated = res.data;
  
      set((state) => ({
        assignedTickets: state.assignedTickets.map((ticket) =>
          ticket._id === id ? { ...ticket, ...updated } : ticket
        ),isUpdating: false,
      }));

    } catch (err) {
      console.error("Failed to update ticket:", err);
    }
  },
  deleteTicket: async (ticketId) => {
    set({ isLoading: true });
    try {
      await axios.delete(`/api/v1/tickets/${ticketId}`);
      set((state) => ({
        tickets: state.tickets.filter(
          (ticket) => ticket._id !== ticketId
        ),
        isLoading: false,
      }));
      toast.success("Ticket deleted successfully");
    } catch (error) {
      console.error("Delete Ticket Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Ticket deletion failed"
      );
      set({ isLoading: false });
    }
  },
  clearTickets: () => {
    set({ tickets: [] });
  },
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
  setTickets: (tickets) => {
    set({ tickets });
  },
  setTicket: (ticket) => {
    set((state) => ({
      tickets: [...state.tickets, ticket],
    }));
  },
  setTicketStatus: (ticketId, status) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, status }
          : ticket
      ),
    }));
  },
  setTicketPriority: (ticketId, priority) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, priority }
          : ticket
      ),
    }));
  },
  setTicketCategory: (ticketId, category) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, category }
          : ticket
      ),
    }));
  },
  setTicketAssignedTo: (ticketId, assignedTo) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, assignedTo }
          : ticket
      ),
    }));
  },
  setTicketCreatedBy: (ticketId, createdBy) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, createdBy }
          : ticket
      ),
    }));
  },
  setTicketDescription: (ticketId, description) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, description }
          : ticket
      ),
    }));
  },
  setTicketTitle: (ticketId, title) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, title }
          : ticket
      ),
    }));
  },
  setTicketCreatedAt: (ticketId, createdAt) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, createdAt }
          : ticket
      ),
    }));
  },
  setTicketUpdatedAt: (ticketId, updatedAt) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, updatedAt }
          : ticket
      ),
    }));
  },
  setTicketId: (ticketId) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, _id: ticketId }
          : ticket
      ),
    }));
  },
}));
