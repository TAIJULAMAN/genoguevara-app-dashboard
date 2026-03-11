import { useState, useEffect } from "react";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../../Redux/features/settings/profileApi";
import { message, Spin } from "antd";

function EditProfile() {
  const { data: profileData, isLoading: isFetching } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const user = profileData?.data;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        contactNo: user.contactNo || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ fullName: formData.fullName }).unwrap();
      message.success("Profile updated successfully");
    } catch (error) {
      message.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center py-10">
        <Spin />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white w-full max-w-xl px-4 sm:px-6 md:px-8 py-5 rounded-md border border-gray-200 shadow-sm">
        <p className="text-[#94CDFA] text-center font-bold text-xl sm:text-2xl mb-5">
          Edit Your Profile
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm md:text-base text-[#94CDFA] mb-2 font-semibold block">
              User Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none placeholder:text-sm md:placeholder:text-base focus:ring-2 focus:ring-[#74AA2E]"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="text-sm md:text-base text-[#94CDFA] mb-2 font-semibold block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none bg-gray-50 text-gray-400 cursor-not-allowed placeholder:text-sm md:placeholder:text-base"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-sm md:text-base text-[#94CDFA] mb-2 font-semibold block">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none placeholder:text-sm md:placeholder:text-base focus:ring-2 focus:ring-[#74AA2E]"
              placeholder="Enter contact number"
            />
          </div>

          <div className="text-center pt-2">
            <button 
              type="submit"
              disabled={isUpdating}
              className="bg-[#94CDFA] text-white font-semibold w-full py-3 rounded-lg hover:opacity-95 transition disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save & Change"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
