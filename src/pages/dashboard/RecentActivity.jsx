import { ConfigProvider, Table } from "antd";
import { MdEdit } from "react-icons/md";

const RecentActivity = () => {
  const dataSource = [
    {
      key: "1",
      title: "Psalm 23:1-4",
      mode: "Morning",
      time: "08:30 AM",
      date: "Oct 24, 2023",
    },
    {
      key: "2",
      title: "Philippians 4:6-7",
      mode: "Night Prayer",
      time: "09:15 PM",
      date: "Oct 23, 2023",
    },
    {
      key: "3",
      title: "Isaiah 41:10",
      mode: "Deep Study",
      time: "12:45 PM",
      date: "Oct 22, 2023",
    },
    {
      key: "4",
      title: "Proverbs 3:5-6",
      mode: "Morning",
      time: "08:35 AM",
      date: "Oct 22, 2023",
    },
    {
      key: "5",
      title: "John 14:27",
      mode: "Night Prayer",
      time: "10:00 PM",
      date: "Oct 21, 2023",
    },
  ];

  const columns = [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-bold text-[#1a2b3c]">{text}</span>
    },
    {
      title: "MODE",
      dataIndex: "mode",
      key: "mode",
      render: (mode) => {
        const styles = {
          "Morning": "bg-blue-50 text-blue-500",
          "Night Prayer": "bg-purple-50 text-purple-600",
          "Deep Study": "bg-orange-50 text-orange-600",
        };
        return (
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${styles[mode] || "bg-gray-50 text-gray-500"}`}>
            {mode}
          </span>
        );
      }
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
      render: (text) => <span className="text-gray-400 font-medium">{text}</span>
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (text) => <span className="text-gray-400 font-medium">{text}</span>
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: () => (
        <button className="text-gray-300 hover:text-[#94cdfa] transition-colors">
          <MdEdit className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#f9fafb",
            headerColor: "#9ca3af",
            headerFontSize: 10,
            headerFontWeight: 900,
            cellPaddingBlock: 16,
            cellFontSize: 14,
            headerSplitColor: "transparent",
          },
        },
      }}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
        className="recent-activity-table"
      />
      <style>{`
        .recent-activity-table .ant-table {
          background: transparent !important;
        }
        .recent-activity-table .ant-table-thead > tr > th {
          letter-spacing: 0.05em;
          border-bottom: 1px solid #f9fafb;
        }
        .recent-activity-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f9fafb;
        }
        .recent-activity-table .ant-table-tbody > tr:hover > td {
          background: #fcfdfe !important;
        }
      `}</style>
    </ConfigProvider>
  );
};

export default RecentActivity;
