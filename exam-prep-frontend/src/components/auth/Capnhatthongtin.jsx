import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
const Capnhatthongtin = ({
  open = false,
  onCancel = () => {},
  onUpdate = () => {},
  user,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 🔥 FIX: thêm open vào dependency
  useEffect(() => {
  if (open && user) {
    form.setFieldsValue({
      fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: user.email || "",
    });
  }
}, [open, user, form])

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await onUpdate(values);

      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="プロフィール更新"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={500}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="氏名"
          name="fullName"
          rules={[
            { required: true, message: "氏名を入力してください" },
          ]}
        >
          <Input placeholder="氏名を入力" size="large" />
        </Form.Item>

        <Form.Item
          label="メールアドレス"
          name="email"
          rules={[
            { required: true, message: "メールアドレスを入力してください" },
            { type: "email", message: "メールアドレスの形式が正しくありません" },
          ]}
        >
          <Input placeholder="メールアドレスを入力" size="large" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleCancel} size="large">
              キャンセル
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              更新
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Capnhatthongtin;