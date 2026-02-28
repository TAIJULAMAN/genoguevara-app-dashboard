import { LuLayoutDashboard, LuBookOpen, LuLogOut, LuInfo } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LuLayoutDashboard,
    },
    {
      name: "Scriptures",
      path: "/scriptures",
      icon: LuBookOpen,
    },
    {
      name: "About Us",
      path: "/about-us",
      icon: LuInfo,
    },
  ];

  const handleLogout = () => {
    navigate("/sign-in");
  };

  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-[#94cdfa]/90 lg:bg-[#94cdfa]/20 border-r border-[#94cdfa]/10 backdrop-blur-md transition-transform duration-300 ease-in-out
      lg:static lg:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
      {/* Mobile Close Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 right-4 p-2 text-[#4a3a2a] hover:bg-white/20 rounded-full transition-colors"
      >
        <IoClose className="w-6 h-6" />
      </button>

      {/* Logo Section */}
      <div className="flex items-center gap-3 px-6 py-10">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md animate-[pulse_3s_infinite]">
          <svg className="w-8 h-8 text-[#94cdfa]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <span className="text-4xl font-black text-white drop-shadow-sm tracking-tight lg:text-[#4a3a2a]">Step 11</span>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4 space-y-3 mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 rounded-[20px] font-bold transition-all duration-300 group ${isActive
                ? "bg-[#4a3a2a] text-[#f8f5f0] shadow-xl shadow-[#4a3a2a]/30 scale-[1.02]"
                : "text-[#4a3a2a]/60 hover:bg-white/40 hover:text-[#4a3a2a]"
              }`
            }
          >
            <item.icon className={`w-6 h-6 transition-transform group-hover:scale-110`} />
            <span className="text-lg">{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Bottom Section - Logout */}
      <div className="px-4 pb-10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-[20px] font-bold text-[#4a3a2a]/60 hover:bg-red-50 hover:text-red-500 transition-all group"
        >
          <LuLogOut className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          <span className="text-lg">Logout</span>
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
