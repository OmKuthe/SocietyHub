import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Calendar,
  CreditCard,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  Receipt,
  ChevronDown,
  ChevronUp,
  PieChart,
  Printer,
  Mail,
  MoreVertical,
  DollarSign,
  Building2,
  Users
} from "lucide-react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Billing() {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      flat: "A-101",
      resident: "Rajesh Sharma",
      amount: 2500,
      dueDate: "2024-04-15",
      status: "Pending",
      paymentMethod: null,
      invoiceNumber: "INV-2024-001",
      email: "rajesh.sharma@example.com",
      phone: "+91 98765 43210"
    },
    {
      id: 2,
      flat: "B-202",
      resident: "Priya Patel",
      amount: 3200,
      dueDate: "2024-03-28",
      status: "Paid",
      paymentMethod: "UPI",
      invoiceNumber: "INV-2024-002",
      paidDate: "2024-03-25",
      email: "priya.patel@example.com",
      phone: "+91 98765 43211"
    },
    {
      id: 3,
      flat: "C-303",
      resident: "Amit Kumar",
      amount: 2800,
      dueDate: "2024-04-10",
      status: "Overdue",
      paymentMethod: null,
      invoiceNumber: "INV-2024-003",
      email: "amit.kumar@example.com",
      phone: "+91 98765 43212"
    },
    {
      id: 4,
      flat: "D-404",
      resident: "Neha Gupta",
      amount: 3500,
      dueDate: "2024-04-05",
      status: "Pending",
      paymentMethod: null,
      invoiceNumber: "INV-2024-004",
      email: "neha.gupta@example.com",
      phone: "+91 98765 43213"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Calculate statistics with useMemo for performance
  const stats = useMemo(() => {
    const totalDue = invoices.reduce((sum, inv) => 
      inv.status === "Pending" || inv.status === "Overdue" ? sum + inv.amount : sum, 0
    );
    const totalCollected = invoices.reduce((sum, inv) => 
      inv.status === "Paid" ? sum + inv.amount : sum, 0
    );
    const overdueAmount = invoices.reduce((sum, inv) => 
      inv.status === "Overdue" ? sum + inv.amount : sum, 0
    );
    const collectionRate = totalDue + totalCollected > 0 
      ? Math.round((totalCollected / (totalDue + totalCollected)) * 100)
      : 0;
    
    return [
      {
        label: "Total Due",
        amount: totalDue,
        icon: Wallet,
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-50",
        trend: "+12% from last month"
      },
      {
        label: "Total Collected",
        amount: totalCollected,
        icon: CreditCard,
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-50",
        trend: "+8% from last month"
      },
      {
        label: "Collection Rate",
        amount: collectionRate,
        icon: TrendingUp,
        suffix: "%",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        trend: "+5% from last month"
      },
      {
        label: "Overdue Amount",
        amount: overdueAmount,
        icon: AlertCircle,
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-50",
        trend: "-3% from last month"
      }
    ];
  }, [invoices]);

  // Chart data for payment trends
  const paymentTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Collection Amount',
        data: [32000, 35000, 38000, 42000, 45000, 48000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `₹${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      }
    }
  };

  const handlePay = (id) => {
    const updated = invoices.map((inv) =>
      inv.id === id ? { 
        ...inv, 
        status: "Paid",
        paymentMethod: "Card",
        paidDate: new Date().toISOString().split('T')[0]
      } : inv
    );
    setInvoices(updated);
    setSelectedInvoice(null);
  };

  const handleDownloadInvoice = (invoice) => {
    // Simulate invoice download
    alert(`Downloading invoice ${invoice.invoiceNumber}`);
  };

  const handleSendReminder = (invoice) => {
    alert(`Sending payment reminder to ${invoice.resident} (${invoice.email})`);
  };

  const handleBulkAction = (action) => {
    if (selectedRows.length === 0) {
      alert("Please select at least one invoice");
      return;
    }
    alert(`Performing "${action}" on ${selectedRows.length} invoice(s)`);
    setSelectedRows([]);
  };

  const toggleRowSelection = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredInvoices.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredInvoices.map(inv => inv.id));
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Paid":
        return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md";
      case "Pending":
        return "bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-md";
      case "Overdue":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Paid":
        return <CheckCircle className="w-4 h-4" />;
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "Overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Sort and filter invoices
  const filteredInvoices = useMemo(() => {
    let filtered = invoices.filter(invoice => {
      const matchesSearch = invoice.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            invoice.resident.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || invoice.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesDateRange = (!dateRange.start || invoice.dueDate >= dateRange.start) &&
                               (!dateRange.end || invoice.dueDate <= dateRange.end);
      return matchesSearch && matchesStatus && matchesDateRange;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (sortBy === "amount") {
        aVal = a.amount;
        bVal = b.amount;
      }
      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [invoices, searchTerm, statusFilter, sortBy, sortOrder, dateRange]);

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
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 md:p-8 max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Maintenance Billing
            </h1>
            <p className="text-gray-500 mt-2">Manage and track all society maintenance payments</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Export
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Generate New Bill
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid with Enhanced Design */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 relative overflow-hidden group cursor-pointer"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bgColor} rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500`} />
            <div className="relative">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">
                {stat.label.includes("Rate") ? stat.amount : "₹" + stat.amount.toLocaleString()}
                {stat.suffix && stat.suffix}
              </p>
              <p className="text-xs text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Updated just now
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart and Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Payment Trends Chart */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Payment Trends</h2>
              <p className="text-sm text-gray-500 mt-1">Monthly collection overview</p>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">₹4.8L total</span>
            </div>
          </div>
          <div className="h-64">
            <Line data={paymentTrendsData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5" />
            <h2 className="text-xl font-bold">Payment Overview</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Paid</span>
              <span className="font-semibold">
                {invoices.filter(i => i.status === "Paid").length} units
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(invoices.filter(i => i.status === "Paid").length / invoices.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Pending</span>
              <span className="font-semibold">
                {invoices.filter(i => i.status === "Pending").length} units
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(invoices.filter(i => i.status === "Pending").length / invoices.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Overdue</span>
              <span className="font-semibold">
                {invoices.filter(i => i.status === "Overdue").length} units
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(invoices.filter(i => i.status === "Overdue").length / invoices.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Collection Efficiency</span>
              <span className="font-semibold text-emerald-400">
                {Math.round((invoices.filter(i => i.status === "Paid").length / invoices.length) * 100)}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters Section - Enhanced */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by flat, resident, or invoice number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border border-gray-200 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bulk Actions Bar */}
      {selectedRows.length > 0 && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-blue-50 rounded-xl p-4 mb-6 flex items-center justify-between"
        >
          <span className="text-sm text-blue-800">
            {selectedRows.length} invoice(s) selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkAction("Send Reminders")}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Send Reminders
            </button>
            <button
              onClick={() => handleBulkAction("Export")}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Export
            </button>
          </div>
        </motion.div>
      )}

      {/* Invoices Table - Enhanced */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr className="text-left">
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filteredInvoices.length && filteredInvoices.length > 0}
                    onChange={toggleAllRows}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th 
                  className="px-6 py-4 text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-800"
                  onClick={() => {
                    if (sortBy === "invoiceNumber") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortBy("invoiceNumber");
                      setSortOrder("asc");
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    Invoice #
                    {sortBy === "invoiceNumber" && (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </div>
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Flat / Resident</th>
                <th 
                  className="px-6 py-4 text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-800"
                  onClick={() => {
                    if (sortBy === "amount") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortBy("amount");
                      setSortOrder("asc");
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    Amount
                    {sortBy === "amount" && (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-800"
                  onClick={() => {
                    if (sortBy === "dueDate") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortBy("dueDate");
                      setSortOrder("asc");
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    Due Date
                    {sortBy === "dueDate" && (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </div>
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {filteredInvoices.map((inv, index) => (
                  <motion.tr
                    key={inv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(inv.id)}
                        onChange={() => toggleRowSelection(inv.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-gray-400" />
                        <span className="font-mono text-sm font-medium text-gray-700">
                          {inv.invoiceNumber}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{inv.flat}</p>
                        <p className="text-sm text-gray-500">{inv.resident}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-lg font-bold text-gray-800">₹{inv.amount.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm ${new Date(inv.dueDate) < new Date() && inv.status !== "Paid" ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                          {new Date(inv.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(inv.status)}`}>
                        {getStatusIcon(inv.status)}
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {(inv.status === "Pending" || inv.status === "Overdue") && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePay(inv.id)}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-1"
                          >
                            <CreditCard className="w-3 h-3" />
                            Pay
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSendReminder(inv)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                          title="Send Reminder"
                        >
                          <Mail className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDownloadInvoice(inv)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                          title="Download Invoice"
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedInvoice(inv)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No invoices found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </motion.div>

      {/* Invoice Details Modal - Enhanced */}
      <AnimatePresence>
        {selectedInvoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedInvoice(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold">Invoice Details</h3>
                    <p className="text-white/80 text-sm mt-1">{selectedInvoice.invoiceNumber}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedInvoice(null)}
                    className="text-white/80 hover:text-white"
                  >
                    ✕
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Flat Number</span>
                    <span className="font-semibold text-gray-800">{selectedInvoice.flat}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Resident Name</span>
                    <span className="font-semibold text-gray-800">{selectedInvoice.resident}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Contact</span>
                    <span className="text-gray-800">{selectedInvoice.phone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Amount</span>
                    <span className="text-2xl font-bold text-blue-600">₹{selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Due Date</span>
                    <span className="font-semibold text-gray-800">{selectedInvoice.dueDate}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Status</span>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedInvoice.status)}`}>
                      {getStatusIcon(selectedInvoice.status)}
                      {selectedInvoice.status}
                    </span>
                  </div>
                  {selectedInvoice.paidDate && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Paid Date</span>
                      <span className="font-semibold text-gray-800">{selectedInvoice.paidDate}</span>
                    </div>
                  )}
                  {selectedInvoice.paymentMethod && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-semibold text-gray-800">{selectedInvoice.paymentMethod}</span>
                    </div>
                  )}
                </div>

                {(selectedInvoice.status === "Pending" || selectedInvoice.status === "Overdue") && (
                  <div className="mt-6 space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePay(selectedInvoice.id)}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Pay Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSendReminder(selectedInvoice)}
                      className="w-full py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                    >
                      Send Reminder
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}