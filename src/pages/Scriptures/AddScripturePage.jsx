import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoChevronBack } from "react-icons/io5";
import { LuUser, LuBook, LuSun, LuMoon } from "react-icons/lu";

function AddScripturePage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mode, setMode] = useState("Dr. Bob");
    const [timeOfDay, setTimeOfDay] = useState("MORNING");

    const modes = [
        { id: "Dr. Bob", name: "Dr. Bob", icon: LuUser },
        { id: "Big Book Thumper", name: "Big Book Thumper", icon: LuBook },
    ];

    const times = [
        { id: "MORNING", name: "MORNING", icon: LuSun },
        { id: "MIDDAY", name: "MIDDAY", icon: LuSun },
        { id: "NIGHT", name: "NIGHT", icon: LuMoon },
    ];

    const handleSave = () => {
        console.log({ title, content, mode, timeOfDay });
        // Navigation back after save
        navigate("/scriptures");
    };

    return (
        <div className="max-w-5xl mx-auto p-6 animate-[fadeInUp_0.5s_ease-out_both]">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate("/scriptures")}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-4 font-bold"
                >
                    <IoChevronBack /> Back to List
                </button>
                <h1 className="text-5xl font-black text-[#1a2b3c] mb-2">Add New Scripture</h1>
                <p className="text-gray-400 text-lg font-medium">Create and manage spiritual wellness content for the app.</p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10">
                {/* Title Input */}
                <div className="mb-10">
                    <label className="block text-[#1a2b3c] font-bold text-lg mb-4">Scripture Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Seeking Guidance in the Morning"
                        className="w-full bg-[#f8fbff] border-none rounded-2xl px-6 py-4 text-gray-700 focus:ring-2 focus:ring-[#94CDFA] transition shadow-inner placeholder:text-gray-300"
                    />
                </div>

                {/* Rich Text Content */}
                <div className="mb-10">
                    <label className="block text-[#1a2b3c] font-bold text-lg mb-4">Content</label>
                    <div className="rounded-2xl border border-gray-100 overflow-hidden bg-[#f8fbff]">
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            placeholder="Enter the scripture text here..."
                            className="bg-white min-h-[300px] border-none quill-custom"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                    {/* Mode Selection */}
                    <div>
                        <label className="block text-[#1a2b3c] font-bold text-lg mb-4">Mode</label>
                        <div className="space-y-4">
                            {modes.map((m) => (
                                <div
                                    key={m.id}
                                    onClick={() => setMode(m.id)}
                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${mode === m.id
                                            ? "border-[#94CDFA] bg-[#f0f7ff]"
                                            : "border-gray-50 bg-white hover:border-gray-100"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-xl ${mode === m.id ? "bg-blue-100 text-[#94CDFA]" : "bg-gray-50 text-gray-400"}`}>
                                            <m.icon className="w-6 h-6" />
                                        </div>
                                        <span className={`font-bold ${mode === m.id ? "text-gray-800" : "text-gray-400"}`}>{m.name}</span>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${mode === m.id ? "border-[#94CDFA]" : "border-gray-200"
                                        }`}>
                                        {mode === m.id && <div className="w-3 h-3 bg-[#94CDFA] rounded-full" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Time of Day Selection */}
                    <div>
                        <label className="block text-[#1a2b3c] font-bold text-lg mb-4">Time of Day</label>
                        <div className="grid grid-cols-3 gap-4">
                            {times.map((t) => (
                                <div
                                    key={t.id}
                                    onClick={() => setTimeOfDay(t.id)}
                                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all ${timeOfDay === t.id
                                            ? "border-[#94CDFA] bg-[#f0f7ff]"
                                            : "border-gray-50 bg-white hover:border-gray-100"
                                        }`}
                                >
                                    <span className={`text-[10px] font-black mb-2 ${timeOfDay === t.id ? "text-[#1a2b3c]" : "text-gray-400"}`}>{t.name}</span>
                                    <div className={`${timeOfDay === t.id ? "text-[#94CDFA]" : "text-gray-300"}`}>
                                        <t.icon className="w-8 h-8" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-400 text-sm italic mt-4">Select when this scripture will be suggested to users.</p>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end items-center gap-10 mt-16 pb-4">
                    <button
                        onClick={() => navigate("/scriptures")}
                        className="text-gray-500 font-bold text-xl hover:text-gray-800 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-[#94cdfa] text-white px-12 py-4 rounded-2xl font-bold text-xl shadow-lg shadow-blue-200 hover:bg-[#83bce9] transition transform hover:scale-[1.02]"
                    >
                        Save Scripture
                    </button>
                </div>
            </div>

            <style>{`
                .quill-custom .ql-toolbar {
                    border: none !important;
                    background: #f8fbff;
                    border-bottom: 1px solid #f1f5f9 !important;
                    padding: 15px !important;
                }
                .quill-custom .ql-container {
                    border: none !important;
                    font-size: 16px;
                }
                .quill-custom .ql-editor {
                    min-height: 250px;
                    padding: 20px;
                    color: #4b5563;
                }
                .quill-custom .ql-editor.ql-blank::before {
                    color: #d1d5db;
                    font-style: normal;
                }
            `}</style>
        </div>
    );
}

export default AddScripturePage;
