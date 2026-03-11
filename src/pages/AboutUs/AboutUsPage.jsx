import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoChevronBack } from "react-icons/io5";
import {
  useGetAboutUsQuery,
  useCreateAboutUsMutation,
} from "../../../Redux/features/settings/aboutUsApi";
import { message, Spin } from "antd";

function AboutUs() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { data: aboutData, isLoading: isFetching } = useGetAboutUsQuery();
  const [createAboutUs, { isLoading: isUpdating }] = useCreateAboutUsMutation();

  useEffect(() => {
    if (aboutData?.data?.about) {
      setContent(aboutData.data.about);
    }
  }, [aboutData]);

  const handleSave = async () => {
    try {
      const res = await createAboutUs({ about: content }).unwrap();
      if (res?.success) {
        message.success(res?.message || "About Us updated successfully");
      }
    } catch (err) {
      console.error("Update error:", err);
      message.error(
        err?.data?.message || err?.message || "Failed to update About Us",
      );
    }
  };

  return (
    <div>
      <div className="bg-[#4a3a2a] px-5 py-3 rounded-md mb-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-white"
          aria-label="Go back"
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">About Us</h1>
      </div>

      <div className=" bg-white rounded shadow p-5 h-full relative border border-gray-100 min-h-[400px]">
        {isFetching ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" tip="Loading content..." />
          </div>
        ) : (
          <ReactQuill
            style={{ padding: "10px", height: "350px" }}
            theme="snow"
            value={content}
            onChange={setContent}
            className="mb-10"
          />
        )}
      </div>
      <div className="text-center py-5">
        <button
          disabled={isUpdating || isFetching}
          onClick={handleSave}
          className="bg-[#4a3a2a] text-white font-semibold w-full py-3 rounded-lg shadow-md cursor-pointer transition-all hover:opacity-90 disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {isUpdating && <Spin size="small" />}
          {isUpdating ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}

export default AboutUs;
