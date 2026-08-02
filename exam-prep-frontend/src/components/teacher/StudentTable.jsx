import TableActions from "../common/TableActions";
import BaseTable from "../common/BaseTable";
const StudentTable = ({ data, loading, onView }) => {
  const columns = [
    {
      title: "試験コード",
      dataIndex: "code",
    },
    {
      title: "試験",
      dataIndex: "exam",
    },
    {
      title: "学生",
      dataIndex: "student",
    },

    {
      title: "クラス",
      dataIndex: "class",
    },
    {
      title: "得点",
      dataIndex: "score",
    },
    {
      title: "操作",
      align: "center",
      render: (_, record) => (
        <TableActions
          record={record}
          onView={(r) => onView(r)}
          showEdit={false}
          showDelete={false}
        />
      ),
    },
  ];

  return <BaseTable columns={columns} data={data} loading={loading} />;
};

export default StudentTable;
