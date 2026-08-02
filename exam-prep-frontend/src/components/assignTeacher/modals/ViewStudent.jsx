import React from 'react'
import { Modal, Table, Spin } from 'antd'

const ViewStudent = ({
  open = false,
  classInfo = null,
  students = [],     // ✅ nhận từ props
  loading = false,  // ✅ loading API
  onClose
}) => {

  // ✅ columns
  const columns = [
    {
      title: 'No.',
      align: 'center',
      render: (_, __, index) => index + 1
    },
    {
      title: 'ユーザー名',
      dataIndex: 'username',
      key: 'username',
      render: (text) => text || '---'
    },
    {
      title: '氏名',
      key: 'fullName',
      render: (_, record) =>
        `${record.firstName || ''} ${record.lastName || ''}`.trim() || '---'
    }
  ]

  return (
    <Modal
      title={`${classInfo?.name || '不明'} クラスの学生`}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      {/* Tổng số */}
      <p>
        <strong>合計： </strong>
        {students.length} 名
      </p>

      {/* Table + Loading */}
      <Spin spinning={loading}>
        <Table
          dataSource={students}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          locale={{ emptyText: '学生がいません' }}
        />
      </Spin>
    </Modal>
  )
}

export default ViewStudent