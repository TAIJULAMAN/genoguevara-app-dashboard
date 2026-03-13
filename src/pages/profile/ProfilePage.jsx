import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";
import { IoChevronBack } from "react-icons/io5";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../Redux/features/settings/profileApi";
import { imgUrl } from "../../../config/envConfig";
import { message, Spin } from "antd";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const navigate = useNavigate();
  const { data: profileData, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const user = profileData?.data;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);
      try {
        await updateProfile(formData).unwrap();
        message.success("Profile picture updated successfully");
      } catch (error) {
        message.error(
          error?.data?.message || "Failed to update profile picture",
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#94CDFA]"></div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      <div className="h-full">
        <div className="bg-[#4a3a2a] px-4 md:px-5 py-3 rounded-md mb-3 flex flex-wrap md:flex-nowrap items-start md:items-center gap-2 md:gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:opacity-90 transition"
            aria-label="Go back"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl sm:text-2xl font-bold">Profile</h1>
        </div>
        <div className="mx-auto flex flex-col justify-center items-center">
          {/* Profile Picture Section */}
          <div className="flex flex-col md:flex-row justify-center items-center bg-[#4a3a2a] mt-5 text-white w-full max-w-3xl mx-auto p-4 md:p-5 gap-4 md:gap-5 rounded-lg">
            <div className="relative">
              <div className="w-[122px] h-[122px] bg-gray-300 rounded-full border-4 border-white shadow-xl flex justify-center items-center relative group overflow-hidden">
                <img
                  src={
                    user?.profileImage
                      ? user.profileImage.startsWith("http")
                        ? user.profileImage
                        : `${imgUrl}/uploads/${user.profileImage}`
                      : "https://avatar.iran.liara.run/public/44"
                  }
                  alt="profile"
                  className={`h-[114px] w-[114px] rounded-full object-cover transition-all ${isUpdating ? "blur-[2px] opacity-70" : ""}`}
                />

                {/* Loading Spinner Over Image */}
                {isUpdating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-full">
                    <Spin />
                  </div>
                )}

                {/* Upload Icon */}
                {!isUpdating && (
                  <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                    <label
                      htmlFor="profilePicUpload"
                      className="cursor-pointer"
                    >
                      <FaCamera className="text-[#575757]" />
                    </label>
                    <input
                      type="file"
                      id="profilePicUpload"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isUpdating}
                      accept="image/*"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg sm:text-xl md:text-3xl font-bold">
                {user?.fullName || "User Name"}
              </p>
              <p className="text-base sm:text-lg font-semibold">
                {user?.role || "Admin"}
              </p>
            </div>
          </div>

          {/* Tab Navigation Section */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 text-sm sm:text-base md:text-xl font-semibold my-4 md:my-5">
            <p
              onClick={() => setActiveTab("editProfile")}
              className={`cursor-pointer px-3 py-1 rounded-md pb-1 ${
                activeTab === "editProfile"
                  ? "text-[#4a3a2a] border-b-2 border-[#4a3a2a]"
                  : "text-[#6A6D76]"
              }`}
            >
              Edit Profile
            </p>
            <p
              onClick={() => setActiveTab("changePassword")}
              className={`cursor-pointer px-3 py-1 rounded-md pb-1 ${
                activeTab === "changePassword"
                  ? "text-[#4a3a2a] border-b-2 border-[#4a3a2a]"
                  : "text-[#6A6D76]"
              }`}
            >
              Change Password
            </p>
          </div>

          {/* Tab Content Section */}
          <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-3xl">
              {activeTab === "editProfile" && <EditProfile />}
              {activeTab === "changePassword" && <ChangePass />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
