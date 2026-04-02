import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Wrench, 
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  MessageSquare,
  Paperclip,
  X,
  ArrowRight,
  TrendingUp,
  ChevronRight,
  ThumbsUp,
  Flag,
  MoreVertical,
  Eye,
  Send
} from "lucide-react";

export default function Complaints() {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Water Leakage in Bathroom",
      description: "Continuous water leakage from the pipeline in the main bathroom. Affecting the walls.",
      category: "Plumbing",
      flat: "A-101",
      resident: "Rajesh Sharma",
      date: "2024-04-01",
      status: "Open",
      priority: "High",
      attachments: 2,
      comments: 3
    },
    {
      id: 2,
      title: "Lift Not Working",
      description: "East wing lift has been malfunctioning since morning. Getting stuck between floors.",
      category: "Elevator",
      flat: "B-202",
      resident: "Priya Patel",
      date: "2024-04-02",
      status: "In Progress",
      priority: "Urgent",
      attachments: 1,
      comments: 5,
      assignedTo: "Maintenance Team A"
    },
    {
      id: 3,
      title: "Garbage Not Collected",
      description: "Garbage bins haven't been emptied for 2 days. Bad odor in the area.",
      category: "Sanitation",
      flat: "C-303",
      resident: "Amit Kumar",
      date: "2024-03-30",
      status: "Resolved",
      priority: "Medium",
      attachments: 3,
      comments: 2,
      resolvedDate: "2024-04-01"
    },
    {
      id: 4,
      title: "Street Light Malfunction",
      description: "Street light near block D is flickering and not working properly.",
      category: "Electrical",
      flat: "D-404",
      resident: "Neha Gupta",
      date: "2024-04-03",
      status: "Open",
      priority: "Low",
      attachments: 0,
      comments: 1
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newComment, setNewComment] = useState("");

  const statusFlow = ["Open", "In Progress", "Resolved", "Closed"];
  
  const categories = ["All", "Plumbing", "Electrical", "Elevator", "Sanitation", "Security", "Others"];
  const priorities = ["All", "Urgent", "High", "Medium", "Low"];

  const stats = [
    {
      label: "Total Complaints",
      value: complaints.length,
      icon: AlertTriangle,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      label: "Open Complaints",
      value: complaints.filter(c => c.status === "Open").length,
      icon: Clock,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    },
    {
      label: "In Progress",
      value: complaints.filter(c => c.status === "In Progress").length,
      icon: Wrench,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      label: "Resolved",
      value: complaints.filter(c => c.status === "Resolved" || c.status === "Closed").length,
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50"
    }
  ];

  const updateStatus = (id) => {
    const updated = complaints.map((c) => {
      if (c.id === id) {
        const currentIndex = statusFlow.indexOf(c.status);
        if (currentIndex < statusFlow.length - 1) {
          const newStatus = statusFlow[currentIndex + 1];
          return { 
            ...c, 
            status: newStatus,
            ...(newStatus === "Resolved" && { resolvedDate: new Date().toISOString().split('T')[0] })
          };
        }
      }
      return c;
    });
    setComplaints(updated);
    setSelectedComplaint(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      "Open": "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md",
      "In Progress": "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md",
      "Resolved": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md",
      "Closed": "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
    };
    return colors[status] || "bg-gray-500 text-white";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      "Urgent": "bg-red-100 text-red-700 border-red-200",
      "High": "bg-orange-100 text-orange-700 border-orange-200",
      "Medium": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Low": "bg-green-100 text-green-700 border-green-200"
    };
    return colors[priority];
  };

  const getStatusIcon = (status) => {
    const icons = {
      "Open": <Clock className="w-4 h-4" />,
      "In Progress": <Wrench className="w-4 h-4" />,
      "Resolved": <CheckCircle className="w-4 h-4" />,
      "Closed": <ThumbsUp className="w-4 h-4" />
    };
    return icons[status];
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      "Urgent": <Flag className="w-4 h-4" />,
      "High": <AlertTriangle className="w-4 h-4" />,
      "Medium": <Clock className="w-4 h-4" />,
      "Low": <CheckCircle className="w-4 h-4" />
    };
    return icons[priority];
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          complaint.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          complaint.resident.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority = priorityFilter === "all" || complaint.priority.toLowerCase() === priorityFilter.toLowerCase();
    const matchesCategory = categoryFilter === "all" || complaint.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In real app, you'd add the comment to the complaint
      alert(`Comment added: ${newComment}`);
      setNewComment("");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 md:p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Complaint Management
            </h1>
            <p className="text-gray-500 mt-2">Track, manage, and resolve resident complaints efficiently</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewComplaint(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Complaint
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 ${stat.bgColor} rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-300`} />
            <div className="relative">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg inline-block mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Status</option>
              {statusFlow.map(status => (
                <option key={status} value={status.toLowerCase()}>{status}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority.toLowerCase()}>{priority}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
            >
              {categories.map(category => (
                <option key={category} value={category.toLowerCase()}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Complaints Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <AnimatePresence>
          {filteredComplaints.map((complaint, index) => (
            <motion.div
              key={complaint.id}
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
              onClick={() => setSelectedComplaint(complaint)}
            >
              {/* Priority Bar */}
              <div className={`h-1 ${complaint.priority === "Urgent" ? "bg-red-500" : 
                                 complaint.priority === "High" ? "bg-orange-500" :
                                 complaint.priority === "Medium" ? "bg-yellow-500" : "bg-green-500"}`} />
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${getPriorityColor(complaint.priority)}`}>
                      {getPriorityIcon(complaint.priority)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                        {complaint.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">{complaint.flat}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{complaint.resident}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {getStatusIcon(complaint.status)}
                    {complaint.status}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {complaint.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(complaint.date).toLocaleDateString()}</span>
                    </div>
                    {complaint.attachments > 0 && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Paperclip className="w-4 h-4" />
                        <span>{complaint.attachments}</span>
                      </div>
                    )}
                    {complaint.comments > 0 && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MessageSquare className="w-4 h-4" />
                        <span>{complaint.comments}</span>
                      </div>
                    )}
                  </div>
                  
                  {complaint.status !== "Closed" && complaint.status !== "Resolved" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(complaint.id);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-1"
                    >
                      Update Status
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  )}

                  {complaint.status === "Resolved" && (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Resolved</span>
                    </div>
                  )}
                </div>

                {complaint.assignedTo && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>Assigned to: {complaint.assignedTo}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredComplaints.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No complaints found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or create a new complaint</p>
        </motion.div>
      )}

      {/* New Complaint Modal */}
      <AnimatePresence>
        {showNewComplaint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewComplaint(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">New Complaint</h3>
                <button onClick={() => setShowNewComplaint(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Complaint Title"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Category</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Priority</option>
                  {priorities.slice(1).map(priority => (
                    <option key={priority}>{priority}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Describe your complaint in detail..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                  <Paperclip className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Drag & drop or click to upload images</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowNewComplaint(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Complaint submitted successfully!");
                    setShowNewComplaint(false);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Submit Complaint
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complaint Details Modal */}
      <AnimatePresence>
        {selectedComplaint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedComplaint(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedComplaint.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">Complaint #{selectedComplaint.id}</p>
                  </div>
                  <button onClick={() => setSelectedComplaint(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(selectedComplaint.status)}`}>
                      {getStatusIcon(selectedComplaint.status)}
                      {selectedComplaint.status}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Priority</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                      {getPriorityIcon(selectedComplaint.priority)}
                      {selectedComplaint.priority}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p className="text-gray-700">{selectedComplaint.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Flat Number</p>
                      <p className="font-semibold">{selectedComplaint.flat}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Resident</p>
                      <p className="font-semibold">{selectedComplaint.resident}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Category</p>
                      <p className="font-semibold">{selectedComplaint.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Reported Date</p>
                      <p className="font-semibold">{selectedComplaint.date}</p>
                    </div>
                  </div>

                  {selectedComplaint.assignedTo && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Assigned To</p>
                      <p className="font-semibold">{selectedComplaint.assignedTo}</p>
                    </div>
                  )}

                  {/* Comments Section */}
                  <div>
                    <p className="text-sm text-gray-500 mb-3">Comments</p>
                    <div className="space-y-3 mb-4">
                      {/* Sample comment - in real app, map through comments */}
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-sm">Admin</span>
                          <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-600">We're looking into this issue. Will update shortly.</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddComment}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {selectedComplaint.status !== "Closed" && selectedComplaint.status !== "Resolved" && (
                  <button
                    onClick={() => updateStatus(selectedComplaint.id)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Update to Next Stage
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}