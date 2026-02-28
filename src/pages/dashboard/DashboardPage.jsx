import { useNavigate } from "react-router-dom";
import { LuBook, LuCirclePlus, LuHistory, LuLayers } from "react-icons/lu";
import RecentActivity from "./RecentActivity";

function DashboardPage() {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Scriptures",
      value: "1,248",
      change: "+4.2%",
      icon: LuBook,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: "Recently Added",
      value: "12",
      subtext: "Past 24h",
      icon: LuCirclePlus,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: "Last Updated",
      value: "2 mins ago",
      icon: LuHistory,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      label: "Mode Distribution",
      value: "3 Active",
      icon: LuLayers,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="flex flex-col gap-8 animate-[fadeIn_0.5s_ease-out]">
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-black text-[#1a2b3c] mb-1">Admin Dashboard</h1>
        <p className="text-gray-400 font-medium">Platform Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.iconBg} ${stat.iconColor} transition-transform group-hover:scale-110`}>
                <stat.icon className="w-6 h-6" />
              </div>
              {stat.change && (
                <span className="bg-green-50 text-green-600 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider">
                  {stat.change}
                </span>
              )}
              {stat.subtext && (
                <span className="text-gray-300 text-[10px] font-bold uppercase tracking-wider">
                  {stat.subtext}
                </span>
              )}
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-[#1a2b3c]">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-[#1a2b3c] mb-1">Quick Actions</h2>
          <p className="text-gray-400 text-sm font-medium">Manage your library content efficiently</p>
        </div>
        <button
          onClick={() => navigate("/add-scripture")}
          className="bg-[#94cdfa] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 hover:bg-[#83bce9] transition-all transform hover:scale-[1.02]"
        >
          <span className="text-xl font-black">+</span> Add New Scripture
        </button>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden mb-10">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-xl font-black text-[#1a2b3c]">Recent Activity</h2>
          <button
            onClick={() => navigate("/scriptures")}
            className="text-[#94cdfa] text-sm font-bold hover:underline"
          >
            View all library
          </button>
        </div>
        <div className="p-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
