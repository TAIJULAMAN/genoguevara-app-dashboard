import {
  LuLayoutDashboard,
  LuBookOpen,
  LuLogOut,
  LuInfo,
} from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/Slice/authSlice";
import PropTypes from "prop-types";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <div
      className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-[#94cdfa]/10 backdrop-blur-md transition-transform duration-300 ease-in-out
      lg:static lg:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-5 right-5 text-[#4a3a2a]"
      >
        <IoClose className="w-5 h-5" />
      </button>

      <div className="flex items-center justify-center py-10">
        <img src="/logo.png" alt="Logo" className="w-24 h-24" />
      </div>
      <div className="flex-1 px-5 space-y-5 mt-5">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
            className={({ isActive }) =>
              `flex items-center gap-5 px-5 py-3 rounded-[15px] font-bold transition-all duration-300 group ${
                isActive ? "bg-[#4a3a2a] text-[#f8f5f0]" : "text-[#4a3a2a]/60"
              }`
            }
          >
            <item.icon className={`w-5 h-5`} />
            <span className="text-lg">{item.name}</span>
          </NavLink>
        ))}
      </div>
      <div className="px-5 py-10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-5 px-5 py-3 rounded-[15px] font-bold text-[#4a3a2a]/60 hover:bg-red-50 hover:text-red-500 transition-all group"
        >
          <LuLogOut className="w-5 h-5" />
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
