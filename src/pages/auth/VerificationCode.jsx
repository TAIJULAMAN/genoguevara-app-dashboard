import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../../../Redux/features/auth/authApi";
import { message, Spin } from "antd";

function VerificationCode() {
  const [code, setCode] = useState(new Array(4).fill(""));
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    const otp = code.join("");
    if (otp.length < 4) {
      return message.error("Please enter the full 4-digit code.");
    }

    if (!email) {
      return message.error(
        "Email is missing. Please try again from the forgot password page.",
      );
    }

    try {
      const res = await verifyEmail({ email, otp }).unwrap();
      if (res?.success) {
        message.success(res.message || "OTP verified successfully");
        navigate("/new-password", { state: { email, otp } });
      }
    } catch (err) {
      console.error("Verification error:", err);
      message.error(
        err?.data?.message || err?.message || "Invalid OTP. Please try again.",
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
                Check your email
              </h1>
              <p className="text-lg text-[#0D0D0D]">
                We sent otp to{" "}
                <span className="font-semibold">{email || "your email"}</span>
                enter 4-digit code that mentioned in the email
              </p>
            </div>

            <form
              className="space-y-5"
              onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
            >
              <div className="flex justify-center gap-4">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    className="shadow-sm w-16 h-16 text-3xl text-center border-2 border-[#6A6D76] text-[#4a3a2a] rounded-lg focus:outline-none focus:border-[#4a3a2a] bg-white transition-all"
                  />
                ))}
              </div>
            </form>
            <div className="flex justify-center items-center my-5">
              <button
                disabled={isLoading}
                onClick={handleVerifyCode}
                type="button"
                className="w-1/3 bg-[#4a3a2a] text-white font-bold py-3 rounded-lg shadow-lg cursor-pointer mt-5 transition-all hover:opacity-90 disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isLoading && <Spin size="small" />}
                {isLoading ? "Verifying..." : "Verify Code"}
              </button>
            </div>
            <div className="text-center mt-5">
              <p className="text-lg text-[#0D0D0D]">
                Didn&apos;t receive the code?{" "}
                <button
                  className="text-[#4a3a2a] font-bold hover:underline cursor-pointer"
                  onClick={() => navigate("/forget-password")}
                >
                  Resend
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;
