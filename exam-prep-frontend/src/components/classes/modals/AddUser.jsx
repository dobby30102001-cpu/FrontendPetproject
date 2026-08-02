import React, { useState, useEffect } from 'react'
import { Modal, Table, Button } from 'antd'

const AddUser = ({
  open,
  onCancel,
  onSubmit,
  users = [],
  loading,
  currentClassUserIds = [],
  disabledUserIds = []
}) => {

  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  // ✅ Sync khi mở modal
  useEffect(() => {
    if (open) {
      setSelectedRowKeys(currentClassUserIds)
    }
  }, [open, currentClassUserIds])

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
      render: (_, record) =>
        `${record.firstName || ''} ${record.lastName || ''}`
    },

  ]

  const rowSelection = {
    selectedRowKeys,

    onChange: (keys) => {
      setSelectedRowKeys(keys)
    },

    // ✅ disable user thuộc class khác
    getCheckboxProps: (record) => ({
      disabled: disabledUserIds.includes(record.id)
    })
  }

  const handleSubmit = () => {
    onSubmit(selectedRowKeys)
  }

  return (
    <Modal
      title="クラスに学生を追加"
      open={open}
      onCancel={onCancel}
      width={700}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          キャンセル
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={loading}
        >
          追加
        </Button>
      ]}
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users}
        rowSelection={rowSelection}
        pagination={{ pageSize: 5 }}
      />
    </Modal>
  )
}

export default AddUser