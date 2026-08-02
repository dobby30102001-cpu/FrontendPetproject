import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/ResetPassword.css";
import { resetPasswordApi } from "../../services/authService";
import { CloseOutlined } from "@ant-design/icons";
const ResetPassword = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      toast.error("パスワードをリセットする前にメールアドレスを入力してください");
      navigate("/");
    }
  }, [navigate]);
  const onFinish = async (values) => {
    const { otp, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("パスワードが一致しません");
      return;
    }

    const email = localStorage.getItem("resetEmail");

    try {
      const res = await resetPasswordApi({
        email: email,
        otp: otp,
        newPassword: password,
        confirmNewPassword: confirmPassword,
      });

      toast.success(res.data.message || "パスワードをリセットしました");

      localStorage.removeItem("resetEmail");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "パスワードのリセットに失敗しました",
      );
    }
  };
  return (
    <div className="reset-password-wrapper">
      <div className="reset-password-container">
        <div className="close-btn" onClick={() => navigate("/")}>
          <CloseOutlined />
        </div>
        <div className="reset-password-header">
          <h2>パスワードのリセット</h2>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className="reset-password-form"
        >
          <Form.Item
            label="OTP コード"
            name="otp"
            rules={[
              { required: true, message: "OTP コードを入力してください" },
              { len: 6, message: "OTP は 6 桁で入力してください" },
            ]}
          >
            <Input placeholder="6 桁の OTP コードを入力" />
          </Form.Item>

          <Form.Item
            label="新しいパスワード"
            name="password"
            rules={[
              { required: true, message: "新しいパスワードを入力してください" },
              { min: 6, message: "パスワードは 6 文字以上で入力してください" },
            ]}
          >
            <Input.Password placeholder="新しいパスワードを入力" />
          </Form.Item>

          <Form.Item
            label="パスワード確認"
            name="confirmPassword"
            rules={[{ required: true, message: "パスワードを再入力してください" }]}
          >
            <Input.Password placeholder="パスワードを再入力" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            パスワードをリセット
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default ResetPassword;