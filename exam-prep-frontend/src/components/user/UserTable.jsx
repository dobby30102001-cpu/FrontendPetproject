import React from 'react'
import { Table, Button, Tag, Switch, Space, Popconfirm, Pagination } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

const UserTable = ({
  data = [],
  loading,
  onEdit,
  onToggleStatus,
  page = 0,
  total = 0,
  onPageChange
}) => {
  const getRoleTag = (role) => {
    const colors = {
      admin: 'blue',
      teacher: 'green',
      student: 'orange'
    }

    const labels = {
      admin: '管理者',
      teacher: '教員',
      student: '学生'
    }

    return <Tag color={colors[role]}>{labels[role]}</Tag>
  }

  const columns = [
    {
      title: 'No.',
      render: (_, __, index) => page * 5 + index + 1
    },
    { title: 'メールアドレス', dataIndex: 'email' },
    { title: 'ユーザー名', dataIndex: 'username' },
    { title: '氏名', dataIndex: 'fullName' },
    {
      title: '役割',
      dataIndex: 'role',
      render: getRoleTag
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      render: (status, record) => {
        const isActive = status === 'ACTIVED'

        return (
          <Popconfirm
            title={isActive ? 'ユーザーを無効にしますか？' : 'ユーザーを有効にしますか？'}
            onConfirm={() => onToggleStatus(record)}
          >
            <Switch
              checked={isActive}
              checkedChildren="有効"
              unCheckedChildren="ロック"
            />
          </Popconfirm>
        )
      }
    },
    { title: '作成日', dataIndex: 'createdAt' },
    {
      title: '操作',
      render: (_, record) => (
        <Button
          type="text"
          icon={<FontAwesomeIcon icon={faPencil} />}
          onClick={() => onEdit(record)}
        />
      )
    }
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={false}
      />

    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <Pagination
          current={page + 1}
          total={total}
          pageSize={5}
          onChange={(p) => onPageChange && onPageChange(p - 1)}
        />
      </div>
    </>
  )
}

export default UserTable