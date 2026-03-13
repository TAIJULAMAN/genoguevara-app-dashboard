import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useChangePasswordMutation } from "../../../Redux/features/auth/authApi";
import { message } from "antd";

function ChangePass() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return message.error("Passwords do not match");
    }
    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }).unwrap();
      message.success("Password changed successfully");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      message.error(error?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="bg-white w-full max-w-xl mx-auto px-4 sm:px-6 md:px-8 pt-8 py-5 rounded-md border border-gray-200 shadow-sm">
      <p className="text-[#4a3a2a] text-center font-bold text-xl sm:text-2xl mb-5">
        Change Password
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="w-full">
          <label className="text-sm md:text-base text-[#4a3a2a] mb-2 font-semibold block">
            Current Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full border border-gray-300 rounded-md outline-none px-4 py-3 placeholder:text-sm md:placeholder:text-base focus:ring-2 focus:ring-[#74AA2E]"
              required
            />
            <button
              type="button"
              onClick={() => toggleVisibility("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-[#6A6D76]"
            >
              {showPassword.current ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label className="text-sm md:text-base text-[#4a3a2a] mb-2 font-semibold block">
            New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full border border-gray-300 rounded-md outline-none px-4 py-3 placeholder:text-sm md:placeholder:text-base focus:ring-2 focus:ring-[#74AA2E]"
              required
            />
            <button
              type="button"
              onClick={() => toggleVisibility("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-[#6A6D76]"
            >
              {showPassword.new ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label className="text-sm md:text-base text-[#4a3a2a] mb-2 font-semibold block">
            Confirm New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full border border-gray-300 rounded-md outline-none px-4 py-3 placeholder:text-sm md:placeholder:text-base focus:ring-2 focus:ring-[#74AA2E]"
              required
            />
            <button
              type="button"
              onClick={() => toggleVisibility("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-[#6A6D76]"
            >
              {showPassword.confirm ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#4a3a2a] text-white font-semibold w-full py-3 rounded-md hover:opacity-95 transition disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save & Change"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
