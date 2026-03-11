import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../../Redux/features/auth/authApi";
import { message, Spin } from "antd";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newPassword = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      return message.error("Passwords do not match!");
    }

    if (!email) {
      return message.error(
        "Session expired. Please start again from forgot password.",
      );
    }

    try {
      const res = await resetPassword({
        email,
        newPassword,
        confirmPassword,
      }).unwrap();
      if (res?.success) {
        message.success(res.message || "Password updated successfully");
        navigate("/sign-in");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      message.error(
        err?.data?.message || err?.message || "Failed to update password.",
      );
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-5">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="w-full lg:w-1/2 bg-[#94CDFA] p-5 md:px-18 md:py-28 shadow-[0px_10px_20px_rgba(0,0,0,0.2)] rounded-2xl">
            <div className="flex justify-center items-center mb-10">
              <img src="/logo.png" alt="Logo" />
            </div>

            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-[#0D0D0D] mb-2">
                Set a new password
              </h1>
              <p className="text-lg text-[#0D0D0D]">
                Create a new password. Ensure it&apos;s at least 6 characters
                long.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="w-full">
                <label className="text-xl text-[#000] mb-2 font-bold block">
                  New Password
                </label>
                <div className="w-full relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="**********"
                    className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-2 placeholder:text-lg bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 flex items-center text-[#6A6D76]"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="w-5 h-5" />
                    ) : (
                      <IoEyeOutline className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="w-full">
                <label className="text-xl text-[#000] mb-2 font-bold block">
                  Confirm New Password
                </label>
                <div className="w-full relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="**********"
                    className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-2 placeholder:text-lg bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 flex items-center text-[#6A6D76]"
                  >
                    {showConfirmPassword ? (
                      <IoEyeOffOutline className="w-5 h-5" />
                    ) : (
                      <IoEyeOutline className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-1/3 bg-[#4a3a2a] text-white font-bold py-3 rounded-lg shadow-lg cursor-pointer mt-5 transition-all hover:opacity-90 disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isLoading && <Spin size="small" />}
                  {isLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
