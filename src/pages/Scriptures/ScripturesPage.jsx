import { ConfigProvider, Modal, Table, Select } from "antd";
import { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ScripturesPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScripture, setSelectedScripture] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modeFilter, setModeFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("Any");

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      title: "Serenity Prayer",
      content: "God grant me the serenity to accept the thin...",
      mode: "Prayer",
      time: "Morning",
      date: "Oct 24, 2023",
    },
    {
      key: "2",
      title: "Daily Reflection",
      content: "The spiritual life is not a theory. We have to li...",
      mode: "Reflection",
      time: "Evening",
      date: "Oct 22, 2023",
    },
    {
      key: "3",
      title: "Silent Awareness",
      content: "Focus on the breath as it enters and leaves t...",
      mode: "Meditation",
      time: "Any",
      date: "Oct 19, 2023",
    },
    {
      key: "4",
      title: "Gratitude Listing",
      content: "List five things you are grateful for today, no...",
      mode: "Reflection",
      time: "Noon",
      date: "Oct 15, 2023",
    },
  ]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <span className="font-semibold text-gray-800">{text}</span>
      ),
    },
    {
      title: "Content Preview",
      dataIndex: "content",
      key: "content",
      render: (text) => (
        <span className="text-gray-500 text-sm italic">{text}</span>
      ),
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
      render: (mode) => {
        const colors = {
          Prayer: "bg-blue-50 text-blue-600 border-blue-100",
          Reflection: "bg-blue-50 text-blue-600 border-blue-100",
          Meditation: "bg-blue-50 text-blue-600 border-blue-100",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold border ${colors[mode] || "bg-gray-50 text-gray-600 border-gray-100"}`}
          >
            {mode}
          </span>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (time) => (
        <span className="bg-gray-50 text-gray-600 border border-gray-100 px-3 py-1 rounded-full text-[10px] font-bold">
          {time}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span className="text-gray-600 text-sm">{text}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-3">
          <button
            onClick={() => console.log("Edit", record)}
            className="text-gray-400 hover:text-blue-500 transition"
          >
            <MdEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => openDelete(record)}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <MdDelete className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    return dataSource.filter((r) => {
      const matchSearch =
        searchQuery.toLowerCase() === "" ||
        [r.title, r.content].some((v) =>
          v.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchMode = modeFilter === "All" || r.mode === modeFilter;
      const matchTime = timeFilter === "Any" || r.time === timeFilter;
      return matchSearch && matchMode && matchTime;
    });
  }, [dataSource, searchQuery, modeFilter, timeFilter]);

  const openDelete = (row) => {
    setSelectedScripture(row);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setDataSource(
      dataSource.filter((item) => item.key !== selectedScripture.key),
    );
    setIsModalOpen(false);
    setSelectedScripture(null);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#4a3a2a",
              hoverBorderColor: "#4a3a2a",
              colorPrimary: "#4a3a2a",
            },
            Pagination: {
              colorPrimaryBorder: "#4a3a2a",
              colorBorder: "#4a3a2a",
              colorPrimaryHover: "#4a3a2a",
              colorTextPlaceholder: "#4a3a2a",
              itemActiveBgDisabled: "#4a3a2a",
              colorPrimary: "#4a3a2a",
            },
            Table: {
              headerBg: "#4a3a2a",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#4a3a2a",
            },
            Select: {
              colorPrimary: "#4a3a2a",
              colorPrimaryHover: "#4a3a2a",
              optionSelectedBg: "#f5f5f5",
              controlHeight: 48,
            },
          },
        }}
      >
        <div className="flex flex-col mb-5">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Scriptures
            </h1>
            <button
              onClick={() => navigate("/add-scripture")}
              className="bg-[#4a3a2a] text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm hover:bg-[#7db8e8] transition"
            >
              <span className="text-xl">+</span> Add New Scripture
            </button>
          </div>
          <div className="flex flex-wrap gap-5 items-center">
            <div className="relative flex-1 min-w-[300px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scriptures..."
                className="w-full h-12 bg-white border border-gray-200 text-gray-900 placeholder-gray-400 pl-10 pr-4 rounded-lg focus:outline-none"
              />
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <Select
              value={modeFilter}
              onChange={setModeFilter}
              className="min-w-[120px] h-12 rounded-lg custom-select"
              options={[
                { label: "Mode: All", value: "All" },
                { label: "Prayer", value: "Prayer" },
                { label: "Reflection", value: "Reflection" },
                { label: "Meditation", value: "Meditation" },
              ]}
            />

            <Select
              value={timeFilter}
              onChange={setTimeFilter}
              className="min-w-[120px] h-12 rounded-lg custom-select"
              options={[
                { label: "Time: Any", value: "Any" },
                { label: "Morning", value: "Morning" },
                { label: "Noon", value: "Noon" },
                { label: "Evening", value: "Evening" },
              ]}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={{
              pageSize: 10,
              showSizeChanger: false,
              className: "custom-pagination px-4 py-4",
            }}
            scroll={{ x: "max-content" }}
          />
        </div>
      </ConfigProvider>

      <Modal
        title="Delete Scripture"
        open={isModalOpen}
        centered
        onCancel={() => setIsModalOpen(false)}
        onOk={confirmDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete this scripture? This action cannot be
          undone.
        </p>
      </Modal>
    </>
  );
}

export default ScripturesPage;
