import React from "react";
import { Tag } from "antd";
import dayjs from "dayjs";
import BaseTable from "../common/BaseTable";
import TableActions from "../common/TableActions";
const ExamTable = ({ data, loading, onPreview, onEdit, onDelete }) => {
  const columns = [
    {
      title: "試験コード",
      dataIndex: "code",
    },
    {
      title: "試験名",
      dataIndex: "title",
    },
    {
      title: "試験種別",
      dataIndex: "examType",
      render: (type) => {
        let color = "default";
        let text = "";
        switch (type) {
          case "PRACTICE":
            color = "success";
            text = "練習";
            break;
          case "OFFICIAL":
            color = "error";
            text = "本試験";
            break;
          default:
            color = "default";
            text = type;
        }
        return <Tag color={color}>{text}</Tag>;
      },

    },
    {
      title: "カテゴリ",
      dataIndex: "category",
    },
    {
      title: "時間",
      dataIndex: "duration",
      render: (d) => <Tag color="blue">{d} 分</Tag>,
    },
    {
      title: "問題数",
      dataIndex: "questions",
    },
    {
      title: "作成日",
      dataIndex: "createDate",
      render: (date) => dayjs(date).format("YYYY/MM/DD"),
    },
    {
      title: "操作",
      align: "center",
      render: (_, record) => (
        <TableActions
          record={record}
          onView={onPreview}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return <BaseTable columns={columns} data={data} loading={loading} />;
};

export default ExamTable;
