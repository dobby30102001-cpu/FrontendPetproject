import React from 'react'
import { Table, Button, Space, Popconfirm, Pagination } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // 👈 THIẾU DÒNG NÀY
import { faPencil, faTrash, faUserPlus, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
const ClassesTable = ({ data, loading, onadd, onEdit, onDelete, onView, page, total, onPageChange }) => {
  const columns = [
    {
      title: 'No.',
      align: 'center',
      render: (_, __, index) => (page * 5) + index + 1
    },
    {
      title: 'クラス名',
      dataIndex: 'name'
    },
    {
      title: '学生数',
      dataIndex: 'studentCount',
      align: 'center',
      render: (count) => count ?? 0
    },
    {
      title: '作成日',
      dataIndex: 'createDate',
      render: (date) =>
        date ? new Date(date).toLocaleDateString('ja-JP') : 'N/A'
    },
    {
      title: '操作',
      align: 'center',
      render: (_, record) => (
        <Space>

          {/* Nút thêm sinh viên */}
          <Button
            type="text"
            icon={<FontAwesomeIcon icon={faUserPlus} />}
            onClick={() => onadd(record)} // 👈 dùng props luôn cho chuẩn
          />

          {/* Nút sửa */}
          <Button
            type="text"
            icon={<FontAwesomeIcon icon={faPencil} />}
            onClick={() => onEdit(record)}
          />

          {/* Nút xóa */}
          <Popconfirm
            title="クラスを削除しますか？"
            onConfirm={() => onDelete(record.id)}
          >
            <Button
              type="text"
              icon={<FontAwesomeIcon icon={faTrash} />}
              danger
            />
          </Popconfirm>
          {/* Nút xem danh sách sinh viên */}
          <Button
            type="text"
            icon={<FontAwesomeIcon icon={faUserGraduate} />}
            onClick={() => onView(record)}
          />
        </Space>
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
          onChange={(p) => onPageChange(p - 1)}
        />
      </div>
    </>
  )
}
export default ClassesTable