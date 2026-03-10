import { useNavigate } from "react-router-dom";
import { LuBook, LuCirclePlus, LuHistory } from "react-icons/lu";
import RecentActivity from "./RecentActivity";

function DashboardPage() {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Scriptures",
      value: "1,248",
      icon: LuBook,
    },
    {
      label: "Recently Added",
      value: "12",
      icon: LuCirclePlus,
    },
    {
      label: "Last Updated",
      icon: LuHistory,
      value: "2 mins ago",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-md shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm font-bold mb-1">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black text-[#1a2b3c]">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`p-3 rounded-xl transition-transform bg-primary-50`}
              >
                <stat.icon className="w-6 h-6 text-[#4a3a2a]" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-5 rounded-md shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-[#1a2b3c]">Quick Actions</h2>
        </div>
        <button
          onClick={() => navigate("/add-scripture")}
          className="bg-[#4a3a2a] text-[#f8f5f0] px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 hover:bg-[#83bce9] transition-all transform hover:scale-[1.02]"
        >
          <span className="text-xl font-black">+</span> Add New Scripture
        </button>
      </div>
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="p-5 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-xl font-black text-[#1a2b3c]">Recent Activity</h2>
          <button
            onClick={() => navigate("/scriptures")}
            className="text-[#4a3a2a] text-sm font-bold"
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
