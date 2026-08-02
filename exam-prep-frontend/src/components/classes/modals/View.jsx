import React from 'react'
import { Modal, Table } from 'antd'
const View = ({ open, onCancel, students = [] }) => {
  const columns = [
    {
      title: 'No.',
      align: 'center',
      render: (_, __, index) => index + 1
    },
    {
      title: 'ユーザー名',
      dataIndex: 'username'
    },
    {
      title: '氏名',
      dataIndex: 'fullName'
    }
  ]
  return (
    <Modal
      title="学生一覧"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Table
        columns={columns}
        dataSource={students}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </Modal>
  )
}

export default View