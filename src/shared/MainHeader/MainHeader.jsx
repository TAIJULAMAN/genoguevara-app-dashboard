import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const MainHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-24 bg-transparent px-4 lg:px-8 flex justify-between lg:justify-end items-center sticky top-0 z-30 transition-all duration-300">
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 text-[#4a3a2a] hover:bg-white/40 rounded-xl transition-colors"
      >
        <IoMenu className="w-8 h-8" />
      </button>

      <div className="flex items-center gap-4 lg:gap-6">
        {/* User Profile */}
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full ring-2 ring-gray-100 ring-offset-2 overflow-hidden transition-all group-hover:ring-[#94cdfa]">
            <img
              src="/avatar.png"
              className="w-full h-full object-cover"
              alt="User"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#4a3a2a]">Geno Guevara</span>
            <span className="text-sm text-[#4a3a2a]/60">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

MainHeader.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default MainHeader;
