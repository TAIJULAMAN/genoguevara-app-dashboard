import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../../Redux/features/auth/authApi";
import { message, Spin } from "antd";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return message.error("Please enter your email.");
    }

    try {
      const res = await forgotPassword({ email }).unwrap();
      if (res?.success) {
        message.success(res.message || "OTP sent successfully");
        navigate("/verification-code", { state: { email } });
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      message.error(
        err?.data?.message ||
          err?.message ||
          "Failed to send OTP. Please try again.",
      );
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-5">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="w-full md:w-1/2 lg:w-1/2 p-5 md:px-[100px] md:py-[200px] bg-[#94CDFA] shadow-[0px_10px_20px_rgba(0,0,0,0.2)] rounded-2xl">
            <div className="flex justify-center items-center mb-10">
              <img src="/logo.png" alt="Logo" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xl text-[#0D0D0D] mb-2 font-bold block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nahidhossain@gmail.com"
                  className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-2 placeholder:text-lg bg-white"
                  required
                />
              </div>

              <div className="flex justify-center items-center">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-1/3 bg-[#4a3a2a] text-white font-bold py-3 rounded-lg shadow-lg cursor-pointer mt-5 transition-all hover:opacity-90 disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isLoading && <Spin size="small" />}
                  {isLoading ? "Sending..." : "Send Code"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
