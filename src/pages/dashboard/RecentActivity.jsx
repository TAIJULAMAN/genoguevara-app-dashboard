import { ConfigProvider, Table } from "antd";

const RecentActivity = () => {
  const dataSource = [
    {
      key: "1",
      title: "Psalm 23:1-4",
      mode: "Prayer",
      time: "08:30 AM",
      date: "Oct 24, 2023",
    },
    {
      key: "2",
      title: "Philippians 4:6-7",
      mode: "Reflection",
      time: "09:15 PM",
      date: "Oct 23, 2023",
    },
    {
      key: "3",
      title: "Isaiah 41:10",
      mode: "Meditation",
      time: "12:45 PM",
      date: "Oct 22, 2023",
    },
    {
      key: "4",
      title: "Proverbs 3:5-6",
      mode: "Prayer",
      time: "08:35 AM",
      date: "Oct 22, 2023",
    },
    {
      key: "5",
      title: "John 14:27",
      mode: "Reflection",
      time: "10:00 PM",
      date: "Oct 21, 2023",
    },
  ];

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
      title: "MODE",
      dataIndex: "mode",
      key: "mode",
      render: (mode) => {
        const colors = {
          Prayer: "bg-blue-50 text-blue-500 border-blue-100",
          Reflection: "bg-[#94cdfa]/10 text-[#4a3a2a] border-[#94cdfa]/20",
          Meditation: "bg-[#4a3a2a]/10 text-[#4a3a2a] border-[#4a3a2a]/20",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border ${
              colors[mode] || "bg-gray-50 text-gray-500"
            }`}
          >
            {mode}
          </span>
        );
      },
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
      render: (text) => (
        <span className="text-[#4a3a2a]/60 font-medium">{text}</span>
      ),
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <span className="text-[#4a3a2a]/60 font-medium">{text}</span>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            activeBorderColor: "#FF0000",
          },
          Pagination: {
            colorPrimaryBorder: "#FF0000",
            colorBorder: "#FF0000",
            colorPrimaryHover: "#FF0000",
            colorTextPlaceholder: "#FF0000",
            itemActiveBgDisabled: "#FF0000",
            colorPrimary: "#FF0000",
          },
          Table: {
            headerBg: "#4a3a2a",
            headerColor: "rgb(255,255,255)",
            cellFontSize: 16,
            headerSplitColor: "#4a3a2a",
          },
        },
      }}
    >
      <div className="recent-activity-table">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ x: "max-content" }}
          bordered={false}
        />
      </div>
      <style>{`
        .recent-activity-table .ant-table {
          background: transparent !important;
        }
        .recent-activity-table .ant-table-thead > tr > th {
          letter-spacing: 0.05em;
          border-bottom: 2px solid #f8f9fa !important;
        }
        .recent-activity-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f8f9fa !important;
        }
        .recent-activity-table .ant-table-tbody > tr:hover > td {
          background: #fdfdfd !important;
        }
      `}</style>
    </ConfigProvider>
  );
};

export default RecentActivity;
