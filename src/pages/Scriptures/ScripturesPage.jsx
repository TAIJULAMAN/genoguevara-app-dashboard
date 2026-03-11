import { ConfigProvider, Modal, Table, Select, message, Spin } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  useDeleteScripturesMutation,
  useGetAllScripturesQuery,
} from "../../../Redux/features/scriptures/scripturesApi";

function ScripturesPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScripture, setSelectedScripture] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modeFilter, setModeFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("Any");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetAllScripturesQuery({
    search: searchQuery || undefined,
    mode: modeFilter === "All" ? undefined : modeFilter,
    timeOfDay: timeFilter === "Any" ? undefined : timeFilter,
    page: currentPage,
    limit: 10,
  });

  const [deleteScripture] = useDeleteScripturesMutation();

  const dataSource = data?.data || [];
  const pagination = data?.meta || {};

  const columns = [
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
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
            className={`px-3 py-1 rounded-full text-[10px] font-bold border ${colors[mode] || "bg-blue-50 text-blue-600 border-blue-100"}`}
          >
            {mode}
          </span>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "timeOfDay",
      key: "timeOfDay",
      render: (time) => (
        <span className="bg-gray-50 text-gray-600 border border-gray-100 px-3 py-1 rounded-full text-[10px] font-bold">
          {time}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <span className="text-gray-600 text-sm">
          {new Date(text).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/edit-scripture/${record._id}`)}
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

  const openDelete = (row) => {
    setSelectedScripture(row);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteScripture(selectedScripture._id).unwrap();
      message.success("Scripture deleted successfully");
      setIsModalOpen(false);
      setSelectedScripture(null);
    } catch (error) {
      message.error(error?.data?.message || "Failed to delete scripture");
    }
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
              onChange={(val) => {
                setModeFilter(val);
                setCurrentPage(1);
              }}
              className="min-w-[120px] h-12 rounded-lg custom-select"
              options={[
                { label: "Mode: All", value: "All" },
                { label: "Dr. Bob", value: "Dr. Bob" },
                { label: "Big Book Thumper", value: "Big Book Thumper" },
              ]}
            />

            <Select
              value={timeFilter}
              onChange={(val) => {
                setTimeFilter(val);
                setCurrentPage(1);
              }}
              className="min-w-[120px] h-12 rounded-lg custom-select"
              options={[
                { label: "Time: Any", value: "Any" },
                { label: "Morning", value: "Morning" },
                { label: "Night", value: "Night" },
                { label: "Midday", value: "Midday" },
              ]}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4 min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center h-64 text-red-500">
              Failed to load scriptures. Please try again later.
            </div>
          ) : (
            <Table
              rowKey="_id"
              dataSource={dataSource}
              columns={columns}
              pagination={{
                current: currentPage,
                pageSize: 10,
                total: pagination.total,
                onChange: (page) => setCurrentPage(page),
                showSizeChanger: false,
                className: "custom-pagination px-4 py-4",
              }}
              scroll={{ x: "max-content" }}
            />
          )}
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
