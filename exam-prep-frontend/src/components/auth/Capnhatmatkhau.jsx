import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "../../assets/styles/ChangePassword.css";
const Capnhatmatkhau = ({
  open = false,
  onCancel = () => {},
  onChangePassword = () => {},
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      await onChangePassword(values);
      toast.success("パスワードを変更しました");
      form.resetFields();
      onCancel();
    } catch (error) {
      toast.error(
        error?.message || "パスワードの変更に失敗しました。もう一度お試しください"
      );
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
      title="パスワード変更"
      open={open}
      footer={null}
      onCancel={handleCancel}
      width={500}
      className="change-password-modal"
    >
      <Form
        form={form}
        layout="vertical"
        className="change-password-form"
        onFinish={handleSubmit}
      >

        <Form.Item
          label="現在のパスワード"
          name="currentPassword"
          rules={[
            {
              required: true,
              message: "現在のパスワードを入力してください",
            },
          ]}
        >
          <Input.Password
            prefix={<FontAwesomeIcon icon={faLock} />}
            placeholder="現在のパスワードを入力"
            size="large"
          />
        </Form.Item>


        <Form.Item
          label="新しいパスワード"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "新しいパスワードを入力してください",
            },
            {
              min: 6,
              message: "パスワードは 6 文字以上で入力してください",
            },
          ]}
        >
          <Input.Password
            prefix={<FontAwesomeIcon icon={faLock} />}
            placeholder="新しいパスワードを入力"
            size="large"
          />
        </Form.Item>


        <Form.Item
          label="新しいパスワード（確認）"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "パスワードを再入力してください",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {

                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("パスワードが一致しません")
                );
              },
            }),
          ]}
        >

          <Input.Password
            prefix={<FontAwesomeIcon icon={faLock} />}
            placeholder="新しいパスワードを再入力"
            size="large"
          />

        </Form.Item>


        <Form.Item style={{ marginBottom: 0 }}>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "flex-end",
            }}
          >

            <Button
              onClick={handleCancel}
              size="large"
            >
              キャンセル
            </Button>


            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              保存
            </Button>

          </div>

        </Form.Item>

      </Form>

    </Modal>
  );
};

export default Capnhatmatkhau;