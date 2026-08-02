import React, { useEffect } from 'react'
import { Modal, Form, Input, Select, Switch } from 'antd'

const Add = ({
  open,
  isEditMode,
  form,
  loading,
  onCancel,
  onSubmit
}) => {

  // ✅ đảm bảo khi mở modal luôn có status
  useEffect(() => {
    if (open) {
      const currentStatus = form.getFieldValue('status')

      if (!currentStatus) {
        form.setFieldsValue({
          status: 'ACTIVED'
        })
      }
    }
  }, [open, form])

  return (
    <Modal
      title={isEditMode ? 'ユーザーを更新' : 'ユーザーを追加'}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        {/* USERNAME */}
        <Form.Item
          name="username"
          label="ユーザー名"
          rules={[{ required: true, message: 'ユーザー名を入力してください' }]}
        >
          <Input disabled={isEditMode} />
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          name="email"
          label="メールアドレス"
          rules={[
            { required: true, message: 'メールアドレスを入力してください' },
            { type: 'email', message: 'メールアドレスの形式が正しくありません' }
          ]}
        >
          <Input />
        </Form.Item>

        {/* FULL NAME */}
        <Form.Item
          name="fullName"
          label="氏名"
          rules={[{ required: true, message: '氏名を入力してください' }]}
        >
          <Input />
        </Form.Item>

        {/* ROLE */}
        <Form.Item
          name="role"
          label="役割"
          rules={[{ required: true, message: '役割を選択してください' }]}
        >
          <Select
            options={[
              { value: 'admin', label: '管理者' },
              { value: 'teacher', label: '教員' },
              { value: 'student', label: '学生' }
            ]}
          />
        </Form.Item>

        {/* STATUS chỉ khi edit */}
        {isEditMode && (
          <Form.Item
            name="status"
            label="ステータス"
            valuePropName="checked"
            getValueFromEvent={(checked) =>
              checked ? 'ACTIVED' : 'LOCKED'
            }
            getValueProps={(value) => ({
              checked: value === 'ACTIVED'
            })}
          >
            <Switch
              checkedChildren="有効"
              unCheckedChildren="ロック"
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

export default Add