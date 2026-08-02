// modal Quên mật khẩu
import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sendOtpApi } from "../../services/authService";

const Quenmatkhau = ({ open, onClose }) => {
  const navigate = useNavigate();
  const handleForgotPassword = async (values) => {
    try {
      const res = await sendOtpApi({
        email: values.email,
      });

      toast.success(res.data.data);

      localStorage.setItem("resetEmail", values.email);

      onClose();

      navigate("/reset-password");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP の送信に失敗しました");
    }
  };
  return (
    <Modal
      title="パスワードをお忘れの方"
      open={open}
      footer={null}
      onCancel={onClose}
      style={{ top: 320 }}
    >
      <Form layout="vertical" onFinish={handleForgotPassword}>
        <Form.Item
          label="メールアドレス"
          name="email"
          rules={[
            { required: true, message: "メールアドレスを入力してください" },
            { type: "email", message: "メールアドレスの形式が正しくありません" },
          ]}
        >
          <Input
            prefix={<FontAwesomeIcon icon={faEnvelope} />}
            placeholder="メールアドレスを入力"
            size="large"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large">
          OTP を送信
        </Button>
      </Form>
    </Modal>
  );
};
export default Quenmatkhau;