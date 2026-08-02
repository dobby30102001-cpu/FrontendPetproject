import React from "react";
import { Tag } from "antd";
import dayjs from "dayjs";
import TableActions from "../common/TableActions";
import BaseTable from "../common/BaseTable";
const QuestionTable = ({ data, loading, onView, onEdit, onDelete }) => {
  const columns = [
    {
      title: "問題",
      dataIndex: "content",
    },
    {
      title: "難易度",
      dataIndex: "difficulty",
      render: (d) => {
        const color =
          d === "EASY" ? "green" : d === "MEDIUM" ? "orange" : "red";
        return <Tag color={color}>{d}</Tag>;
      },
    },
    {
      title: "カテゴリ",
      dataIndex: "category",
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
          onView={(r) => onView(r.id)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return <BaseTable columns={columns} data={data} loading={loading} />;
};

export default QuestionTable;
