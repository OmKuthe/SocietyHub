import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserPlus, 
  UserCheck, 
  UserX, 
  Clock, 
  Search,
  Filter,
  Calendar,
  Phone,
  Car,
  Camera,
  Download,
  ChevronRight,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  Users,
  Building,
  Mail,
  MapPin,
  QrCode,
  Printer,
  MoreVertical,
  Shield,
  Clock3
} from "lucide-react";

export default function Visitors() {
  const [visitors, setVisitors] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      flat: "A-101",
      resident: "Rajesh Sharma",
      purpose: "Family Visit",
      phone: "+91 98765 43210",
      vehicle: "MH 02 AB 1234",
      checkIn: "2024-04-03 10:30 AM",
      status: "Inside",
      expectedDuration: "2 hours",
      idProof: "Aadhar",
      photo: null,
      checkedInBy: "Security Guard",
      notes: "Visiting family for lunch"
    },
    {
      id: 2,
      name: "Priya Patel",
      flat: "B-202",
      resident: "Amit Patel",
      purpose: "Delivery",
      phone: "+91 87654 32109",
      vehicle: "Bike",
      checkIn: "2024-04-03 09:15 AM",
      status: "Inside",
      expectedDuration: "30 mins",
      idProof: "None",
      photo: null,
      checkedInBy: "Security Guard",
      notes: "Food delivery"
    },
    {
      id: 3,
      name: "Vikram Singh",
      flat: "C-303",
      resident: "Neha Singh",
      purpose: "Maintenance",
      phone: "+91 76543 21098",
      vehicle: "MH 01 CD 5678",
      checkIn: "2024-04-02 02:00 PM",
      checkOut: "2024-04-02 04:30 PM",
      status: "Exited",
      expectedDuration: "2 hours",
      idProof: "Driver's License",
      photo: null,
      checkedInBy: "Security Guard",
      notes: "AC repair work",
      duration: "2h 30m"
    },
    {
      id: 4,
      name: "Anjali Mehta",
      flat: "D-404",
      resident: "Sanjay Mehta",
      purpose: "Friend Visit",
      phone: "+91 65432 10987",
      vehicle: "None",
      checkIn: "2024-04-03 11:45 AM",
      status: "Inside",
      expectedDuration: "4 hours",
      idProof: "PAN Card",
      photo: null,
      checkedInBy: "Security Guard",
      notes: "Business meeting"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  
  // New visitor form state
  const [newVisitor, setNewVisitor] = useState({
    name: "",
    phone: "",
    flat: "",
    resident: "",
    purpose: "",
    vehicle: "",
    expectedDuration: "",
    idProof: "",
    notes: ""
  });

  const purposes = ["All", "Family Visit", "Friend Visit", "Delivery", "Maintenance", "Business", "Other"];
  const statuses = ["All", "Inside", "Exited"];

  const stats = [
    {
      label: "Inside Premises",
      value: visitors.filter(v => v.status === "Inside").length,
      icon: UserCheck,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50"
    },
    {
      label: "Today's Visitors",
      value: visitors.filter(v => v.checkIn?.includes("2024-04-03")).length,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      label: "Average Duration",
      value: "2.4 hrs",
      icon: Clock,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      label: "Vehicles Inside",
      value: visitors.filter(v => v.vehicle && v.vehicle !== "None" && v.status === "Inside").length,
      icon: Car,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    }
  ];

  const addVisitor = () => {
    if (!newVisitor.name || !newVisitor.flat) return;

    const visitor = {
      id: Date.now(),
      ...newVisitor,
      checkIn: new Date().toLocaleString(),
      status: "Inside",
      checkedInBy: "Security Guard",
      photo: null
    };

    setVisitors([visitor, ...visitors]);
    setShowCheckIn(false);
    setNewVisitor({
      name: "",
      phone: "",
      flat: "",
      resident: "",
      purpose: "",
      vehicle: "",
      expectedDuration: "",
      idProof: "",
      notes: ""
    });
  };

  const markExit = (id) => {
    const updated = visitors.map((v) =>
      v.id === id ? { 
        ...v, 
        status: "Exited", 
        checkOut: new Date().toLocaleString(),
        duration: calculateDuration(v.checkIn)
      } : v
    );
    setVisitors(updated);
    setSelectedVisitor(null);
  };

  const calculateDuration = (checkIn) => {
    const checkInTime = new Date(checkIn);
    const checkOutTime = new Date();
    const diffMs = checkOutTime - checkInTime;
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffMins = Math.floor((diffMs % 3600000) / 60000);
    return `${diffHrs}h ${diffMins}m`;
  };

  const getStatusColor = (status) => {
    return status === "Inside" 
      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
      : "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-md";
  };

  const getStatusIcon = (status) => {
    return status === "Inside" ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />;
  };

  const getPurposeIcon = (purpose) => {
    const icons = {
      "Family Visit": <Users className="w-4 h-4" />,
      "Friend Visit": <Users className="w-4 h-4" />,
      "Delivery": <Clock className="w-4 h-4" />,
      "Maintenance": <Wrench className="w-4 h-4" />,
      "Business": <Building className="w-4 h-4" />
    };
    return icons[purpose] || <UserCheck className="w-4 h-4" />;
  };

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          visitor.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          visitor.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || visitor.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPurpose = purposeFilter === "all" || visitor.purpose === purposeFilter;
    return matchesSearch && matchesStatus && matchesPurpose;
  });

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
              Visitor Management
            </h1>
            <p className="text-gray-500 mt-2">Track and manage all visitors entering the premises</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQRCode(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              QR Check-in
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCheckIn(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Check-in Visitor
            </motion.button>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, flat, or phone..."
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
              {statuses.map(status => (
                <option key={status} value={status.toLowerCase()}>{status}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={purposeFilter}
              onChange={(e) => setPurposeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
            >
              {purposes.map(purpose => (
                <option key={purpose} value={purpose === "All" ? "all" : purpose}>{purpose}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Visitors Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <AnimatePresence>
          {filteredVisitors.map((visitor, index) => (
            <motion.div
              key={visitor.id}
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
              onClick={() => setSelectedVisitor(visitor)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${visitor.status === "Inside" ? "from-emerald-500 to-teal-500" : "from-gray-500 to-gray-600"} flex items-center justify-center text-white font-bold text-lg`}>
                      {visitor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                        {visitor.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">Flat {visitor.flat}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">Visiting {visitor.resident}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(visitor.status)}`}>
                    {getStatusIcon(visitor.status)}
                    {visitor.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{visitor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Check-in: {visitor.checkIn}</span>
                  </div>
                  {visitor.vehicle && visitor.vehicle !== "None" && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Car className="w-4 h-4 text-gray-400" />
                      <span>{visitor.vehicle}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span>ID: {visitor.idProof}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      visitor.purpose === "Delivery" ? "bg-orange-100 text-orange-600" :
                      visitor.purpose === "Maintenance" ? "bg-blue-100 text-blue-600" :
                      "bg-purple-100 text-purple-600"
                    }`}>
                      {getPurposeIcon(visitor.purpose)}
                      <span className="ml-1">{visitor.purpose}</span>
                    </div>
                    {visitor.expectedDuration && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock3 className="w-3 h-3" />
                        <span>Expected: {visitor.expectedDuration}</span>
                      </div>
                    )}
                  </div>
                  
                  {visitor.status === "Inside" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        markExit(visitor.id);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-1"
                    >
                      <UserX className="w-4 h-4" />
                      Mark Exit
                    </motion.button>
                  )}

                  {visitor.status === "Exited" && visitor.duration && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Duration: {visitor.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredVisitors.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No visitors found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or check-in a new visitor</p>
        </motion.div>
      )}

      {/* Check-in Modal */}
      <AnimatePresence>
        {showCheckIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCheckIn(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Check-in Visitor</h3>
                    <p className="text-gray-500 text-sm mt-1">Enter visitor details for security clearance</p>
                  </div>
                  <button onClick={() => setShowCheckIn(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Visitor Name *"
                    value={newVisitor.name}
                    onChange={(e) => setNewVisitor({...newVisitor, name: e.target.value})}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={newVisitor.phone}
                    onChange={(e) => setNewVisitor({...newVisitor, phone: e.target.value})}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Flat Number *"
                    value={newVisitor.flat}
                    onChange={(e) => setNewVisitor({...newVisitor, flat: e.target.value})}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Resident Name"
                    value={newVisitor.resident}
                    onChange={(e) => setNewVisitor({...newVisitor, resident: e.target.value})}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newVisitor.purpose}
                    onChange={(e) => setNewVisitor({...newVisitor, purpose: e.target.value})}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Purpose</option>
                    {purposes.slice(1).map(purpose => (
                      <option key={purpose}>{purpose}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Vehicle Number"
                    value={newVisitor.vehicle}
                    onChange={(e) => setNewVisitor({...newVisitor, vehicle: e.target.value})}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newVisitor.idProof}
                    onChange={(e) => setNewVisitor({...newVisitor, idProof: e.target.value})}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">ID Proof Type</option>
                    <option>Aadhar</option>
                    <option>PAN Card</option>
                    <option>Driver's License</option>
                    <option>Voter ID</option>
                    <option>Passport</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Expected Duration (e.g., 2 hours)"
                    value={newVisitor.expectedDuration}
                    onChange={(e) => setNewVisitor({...newVisitor, expectedDuration: e.target.value})}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <textarea
                  placeholder="Additional Notes"
                  rows="3"
                  value={newVisitor.notes}
                  onChange={(e) => setNewVisitor({...newVisitor, notes: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                  <Camera className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Take visitor photo (optional)</p>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex gap-3">
                <button
                  onClick={() => setShowCheckIn(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addVisitor}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Check-in Visitor
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visitor Details Modal */}
      <AnimatePresence>
        {selectedVisitor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVisitor(null)}
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
                    <h3 className="text-2xl font-bold text-gray-800">{selectedVisitor.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">Visitor Details</p>
                  </div>
                  <button onClick={() => setSelectedVisitor(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedVisitor.status === "Inside" ? "from-emerald-500 to-teal-500" : "from-gray-500 to-gray-600"} flex items-center justify-center text-white font-bold text-2xl`}>
                      {selectedVisitor.name.charAt(0)}
                    </div>
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(selectedVisitor.status)}`}>
                        {getStatusIcon(selectedVisitor.status)}
                        {selectedVisitor.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-2">Checked-in by: {selectedVisitor.checkedInBy}</p>
                    </div>
                  </div>
                  {selectedVisitor.status === "Inside" && (
                    <button
                      onClick={() => markExit(selectedVisitor.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      Mark Exit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-semibold">{selectedVisitor.phone}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Purpose</p>
                    <p className="font-semibold">{selectedVisitor.purpose}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Flat Number</p>
                    <p className="font-semibold">{selectedVisitor.flat}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Resident</p>
                    <p className="font-semibold">{selectedVisitor.resident}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Check-in Time</p>
                    <p className="font-semibold">{selectedVisitor.checkIn}</p>
                  </div>
                  {selectedVisitor.checkOut && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Check-out Time</p>
                      <p className="font-semibold">{selectedVisitor.checkOut}</p>
                    </div>
                  )}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">ID Proof</p>
                    <p className="font-semibold">{selectedVisitor.idProof}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Vehicle</p>
                    <p className="font-semibold">{selectedVisitor.vehicle || "None"}</p>
                  </div>
                </div>

                {selectedVisitor.notes && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Notes</p>
                    <p className="text-gray-700">{selectedVisitor.notes}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Printer className="w-4 h-4" />
                    Print Pass
                  </button>
                  <button className="flex-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Data
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowQRCode(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <QrCode className="w-24 h-24 text-gray-800 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Quick QR Check-in</h3>
              <p className="text-gray-500 mb-6">Scan this QR code at the gate for instant check-in</p>
              <div className="bg-gray-100 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600">Society ID: HSM-2024-001</p>
                <p className="text-xs text-gray-500 mt-1">Valid for today only</p>
              </div>
              <button
                onClick={() => setShowQRCode(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Import missing icon
import { Wrench } from "lucide-react";