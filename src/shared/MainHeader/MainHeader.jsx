import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useGetProfileQuery } from "../../../Redux/features/settings/profileApi";
import { imgUrl } from "../../../config/envConfig";

const MainHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { data: profileData } = useGetProfileQuery();
  const user = profileData?.data;

  return (
    <div className="w-full h-24 bg-[#94cdfa]/10 backdrop-blur-md px-5 flex justify-between lg:justify-end items-center sticky top-0 z-30 transition-all duration-300">
      {/* Mobile Menu Toggle */}
      <button onClick={toggleSidebar} className="lg:hidden p-2 text-[#4a3a2a]">
        <IoMenu className="w-8 h-8" />
      </button>

      {/* User Profile */}
      <div
        onClick={() => navigate("/profile")}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img
            src={
              user?.profileImage
                ? user.profileImage.startsWith("http")
                  ? user.profileImage
                  : `${imgUrl}/uploads/${user.profileImage}`
                : "/avatar.png"
            }
            className="w-full h-full object-cover"
            alt="User"
            onError={(e) => {
              e.target.src = "/avatar.png";
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-[#4a3a2a]">
            {user?.fullName || "Geno Guevara"}
          </span>
          <span className="text-sm text-[#4a3a2a]/60 capitalize">
            {user?.role || "Admin"}
          </span>
        </div>
      </div>
    </div>
  );
};

MainHeader.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default MainHeader;
