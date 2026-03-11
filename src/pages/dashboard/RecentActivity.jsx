import { ConfigProvider, Table, Spin } from "antd";
import { useGetRecentScripturesQuery } from "../../../Redux/features/scriptures/scripturesApi";

const RecentActivity = () => {
  const { data, isLoading } = useGetRecentScripturesQuery();
  const dataSource = data?.data || [];

  const columns = [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <span className="font-bold text-[#4a3a2a]">{text}</span>
      ),
    },
    {
      title: "AUTHOR",
      dataIndex: "author",
      key: "author",
      render: (text) => (
        <span className="text-[#4a3a2a]/80 font-medium">{text}</span>
      ),
    },
    {
      title: "CONTENT PREVIEW",
      dataIndex: "content",
      key: "content",
      render: (text) => {
        const plainText = text?.replace(/<[^>]*>/g, "") || "";
        return (
          <span className="text-gray-500 text-sm italic">
            {plainText.length > 30
              ? `${plainText.substring(0, 30)}...`
              : plainText}
          </span>
        );
      },
    },
    {
      title: "MODE",
      dataIndex: "mode",
      key: "mode",
      render: (mode) => {
        const colors = {
          Prayer: "bg-blue-50 text-blue-500 border-blue-100",
          Reflection: "bg-[#94cdfa]/10 text-[#4a3a2a] border-[#94cdfa]/20",
          Meditation: "bg-[#4a3a2a]/10 text-[#4a3a2a] border-[#4a3a2a]/20",
          "Dr. Bob": "bg-purple-50 text-purple-600 border-purple-100",
          "Big Book Thumper": "bg-orange-50 text-orange-600 border-orange-100",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border ${
              colors[mode] || "bg-gray-50 text-gray-500 border-gray-100"
            }`}
          >
            {mode}
          </span>
        );
      },
    },
    {
      title: "TIME",
      dataIndex: "timeOfDay",
      key: "timeOfDay",
      render: (text) => (
        <span className="text-[#4a3a2a]/60 font-medium">{text}</span>
      ),
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <span className="text-[#4a3a2a]/60 font-medium">
          {new Date(text).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#4a3a2a",
            headerColor: "rgb(255,255,255)",
            cellFontSize: 16,
            headerSplitColor: "#4a3a2a",
          },
        },
      }}
    >
      <div className="recent-activity-table min-h-[300px] flex flex-col justify-center">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            rowKey="_id"
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
            bordered={false}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

export default RecentActivity;
