import BaseTable from "../common/BaseTable";
import TableActions from "../common/TableActions";

export default function ExamClassTable({ data, onView, onEdit, loading }) {
  const columns = [
    {
      title: "クラス",
      dataIndex: "name",
    },
    {
      title: "学生数",
      dataIndex: "studentCount",
    },
    {
      title: "試験数",
      render: (_, record) => record.exams?.length || 0,
    },
    {
      title: "操作",
      align: "center",
      render: (_, record) => (
        <TableActions
          record={record}
          onView={onView}
          onEdit={onEdit}
          showDelete={false}
        />
      ),
    },
  ];

  return <BaseTable columns={columns} data={data} loading={loading} />;
}
