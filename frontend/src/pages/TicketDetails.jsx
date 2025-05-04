import React, { use, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  Activity,
  AlertCircle,
  Send,
  ArrowLeft,
  Calendar,
  Tag,
  Flag,
  User,
  MessageSquare,
} from "lucide-react";
import { useTicketStore } from "../store/ticketStore";
import { useAuthStore } from "../store/authStore";
const TicketDetails = () => {
  const { user } = useAuthStore();
  const { addComment } = useTicketStore();
  const [commentText, setCommentText] = React.useState("");
  const { id } = useParams(); // 🔑 Get ticket ID from URL
  const [ticket, setTicket] = React.useState(null);
  const [engineer, setEngineer] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `/api/v1/dashboard/tickets/${id}`
        ); // backend endpoint
        setTicket(response.data.ticket);
        setComments(response.data.ticket.comments || []);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  useEffect(() => {
    const fetchEngineer = async () => {
      try {
        const response = await axios.get(
          `/api/v1/dashboard/user/${ticket?.assignedTo}`
        ); // backend endpoint
        setEngineer(response.data.user.name);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEngineer();
  }, [ticket?.assignedTo]);
  // Status badge component
  const StatusBadge = ({ status }) => {
    let badgeClass = "";
    let icon = null;

    switch (status) {
      case "new":
        badgeClass = "bg-blue-100 text-blue-800";
        icon = <Clock className="w-4 h-4 mr-1" />;
        break;
      case "assigned":
        badgeClass = "bg-purple-100 text-purple-800";
        icon = <User className="w-4 h-4 mr-1" />;
        break;
      case "in_progress":
        badgeClass = "bg-yellow-100 text-yellow-800";
        icon = <Activity className="w-4 h-4 mr-1" />;
        break;
      case "resolved":
        badgeClass = "bg-green-100 text-green-800";
        icon = <CheckCircle className="w-4 h-4 mr-1" />;
        break;
      default:
        badgeClass = "text-gray-500";
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${badgeClass}`}
      >
        {icon}
        {ticket?.status
          ?.replace("_", " ")
          .charAt(0)
          .toUpperCase() +
          ticket?.status?.replace("_", " ").slice(1)}
      </span>
    );
  };

  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    let badgeClass = "";

    switch (priority) {
      case "low":
        badgeClass = "bg-pink-500/80 text-white";
        break;
      case "medium":
        badgeClass = "bg-yellow-500/80 text-white";
        break;
      case "high":
        badgeClass = "bg-orange-500/80 text-white";
        break;
      case "critical":
        badgeClass =
          "bg-red-500/80 text-white animate-pulse";
        break;
      default:
        badgeClass = "bg-green-500/80 text-white";
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${badgeClass}`}
      >
        <Flag className="w-4 h-4 mr-1" />
        {priority?.charAt(0).toUpperCase() +
          priority?.slice(1)}
      </span>
    );
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const newComment = {
        text: commentText,
        commentedBy: user?.name,
      };
      await addComment(ticket._id, newComment);

      // Fetch updated ticket with comments
      const updatedTicket = await axios.get(
        `/api/v1/dashboard/tickets/${ticket._id}`
      );
      setComments(updatedTicket.data.ticket.comments || []);
      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };
  console.log(ticket?.comments);
  return (
    <DashboardLayout pageTitle={"Ticket Details"}>
      <div className=" bg-gray-50 min-h-screen ">
        <button
          onClick={() =>
            navigate(
              user?.role === "engineer"
                ? "/dashboard/assigned-tickets"
                : "/dashboard/tickets"
            )
          }
          className="inline-flex mb-4 items-center text-lg   text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Ticket Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className=" md:text-2xl font-semibold text-gray-600 mb-2">
                      {ticket?.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 md:mb-4">
                      <StatusBadge
                        status={ticket?.status}
                      />
                      {ticket?.status === "resolved" ? (
                        <PriorityBadge
                          priority={"Neutral"}
                        />
                      ) : (
                        <PriorityBadge
                          priority={ticket?.priority.toLowerCase()}
                        />
                      )}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        <Tag className="w-4 h-4 mr-1" />
                        {ticket?.category}
                      </span>
                    </div>
                  </div>

                  {/* {isAssignedEngineer &&
                    ticket.status !== "resolved" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate("resolved")
                        }
                        className="btn btn-success"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Mark as Resolved
                      </button>
                    )}

                  {isAssignedEngineer &&
                    ticket.status === "assigned" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate("in_progress")
                        }
                        className="btn btn-primary"
                      >
                        <Activity className="w-5 h-5 mr-2" />
                        Start Working
                      </button>
                    )} */}
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-line">
                      {ticket?.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <User className="w-4 h-4 mr-1" />
                    <span>
                      Created by:{" "}
                      <span className="font-medium">
                        {ticket?.createdBy?.name ||
                          "Unknown"}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      Created:{" "}
                      <span className="font-semibold text-gray-500">
                        {formatDate(ticket?.createdAt)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Comments Section */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-lg font-semibold mb-4">
                Comments & Updates
              </h3>
              <div className="space-y-4 mb-4 max-h-60 overflow-y-auto pr-2">
                {comments.length === 0 && (
                  <div className="text-gray-500 text-sm">
                    No comments yet. Be the first to
                    comment!
                  </div>
                )}
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-100 rounded-md shadow-sm"
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold">
                        {comment.commentedBy
                          ?.charAt(0)
                          .toUpperCase() || "U"}
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-800">
                          {comment.commentedBy}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(
                            comment?.commentedAt || new Date()
                          )}
                        </span>
                      </div>
                      <p className="text-sm mt-1 text-gray-700 whitespace-pre-wrap">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2">
                <textarea
                  className="flex-grow border rounded-lg p-2 text-sm"
                  placeholder="Add a comment or update..."
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(e.target.value)
                  }
                ></textarea>

                <button
                  onClick={handleComment}
                  className="bg-[#5585CE] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#5585CE]/90"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>

          {/* Ticket Info Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg  font-semibold text-gray-600">
                  Ticket Information
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      ID:
                    </span>
                    <span className="w-2/3 text-sm font-semibold text-gray-600">
                      {ticket?._id?.substring(0, 8)}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Status:
                    </span>
                    <span className="w-2/3">
                      <StatusBadge
                        status={ticket?.status}
                      />
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Priority:
                    </span>
                    <span className="w-2/3">
                      {ticket?.status === "resolved" ? (
                        <PriorityBadge
                          priority={"Neutral"}
                        />
                      ) : (
                        <PriorityBadge
                          priority={ticket?.priority.toLowerCase()}
                        />
                      )}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Category:
                    </span>
                    <span className="w-2/3 text-sm font-semibold text-gray-600">
                      {ticket?.category}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Created:
                    </span>
                    <span className="w-2/3 text-sm font-semibold text-gray-600">
                      {formatDate(ticket?.createdAt)}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Updated:
                    </span>
                    <span className="w-2/3 text-sm font-semibold text-gray-600">
                      {formatDate(ticket?.updatedAt)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  People
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Submitted by:
                    </span>
                    <span className="w-2/3 text-sm font-semibold text-gray-600">
                      {ticket?.createdBy?.name}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Assigned to:
                    </span>
                    <span className="w-2/3 text-sm font-semibold text-gray-600">
                      {engineer || "Unassigned"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketDetails;
