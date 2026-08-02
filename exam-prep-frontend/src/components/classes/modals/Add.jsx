import React from 'react'
import { Modal, Form, Input, Button, Space } from 'antd'
const Add = ({ open, isEditMode, form, loading, onCancel, onSubmit }) => {
  return (
    <Modal
      title={isEditMode ? 'クラスを編集' : 'クラスを新規作成'}
      open={open}
      confirmLoading={loading}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item
          name="name"
          label="クラス名"
          rules={[{ required: true, message: 'クラス名を入力してください！' }]}
        >
          <Input placeholder="例：Java 基礎クラス 01" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={onCancel}>
              キャンセル
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {isEditMode ? '更新' : 'クラスを作成'}
            </Button>
          </Space>
        </Form.Item>

      </Form>
    </Modal>
  )
}

export default Add