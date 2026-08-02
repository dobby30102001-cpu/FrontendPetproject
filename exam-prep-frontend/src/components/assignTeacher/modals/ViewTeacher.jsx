import React from 'react'
import { Modal, Table, Spin } from 'antd'

const ViewTeacher = ({
  open = false,
  classInfo = null,
  teachers = [],      // ✅ nhận từ props (API)
  loading = false,    // ✅ loading
  onClose
}) => {

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
      title={`${classInfo?.name || '不明'} クラスの教員`}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      {/* Tổng số */}
      <p>
        <strong>教員数： </strong>
        {teachers.length}
      </p>

      {/* Table + Loading */}
      <Spin spinning={loading}>
        <Table
          dataSource={teachers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          locale={{ emptyText: '教員がいません' }}
        />
      </Spin>
    </Modal>
  )
}
export default ViewTeacher