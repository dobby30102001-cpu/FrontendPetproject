import React from "react";
import { Form, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.png";
import "../../assets/styles/Login.css";
import { useNavigate } from "react-router-dom";
import Quenmatkhau from "../../components/auth/Quenmatkhau";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [openForgot, setOpenForgot] = React.useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = await login(values);
      if (userData.failCount > 0) {
        toast.warning(`ログインに ${userData.failCount} 回失敗しています`);
      }

      toast.success("ログインしました");

      const role = userData.role;
      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "TEACHER") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("サーバーに接続できません");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* LEFT LOGIN */}
        <div className="login-box">
          <div className="login-header">
            <div className="logo-container">
              <img src={logo} alt="VTI Academy" className="logo" />
            </div>

            <h1>おかえりなさい</h1>
            <p>管理システムにログイン</p>
          </div>

          <Form layout="vertical" className="login-form" onFinish={onFinish}>
            <Form.Item
              label="メール または ユーザー名"
              name="emailOrUsername"
              rules={[
                {
                  required: true,
                  message: "メールまたはユーザー名を入力してください",
                },
              ]}
            >
              <Input
                prefix={<FontAwesomeIcon icon={faUser} />}
                placeholder="メール または ユーザー名"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="パスワード"
              name="password"
              rules={[{ required: true, message: "パスワードを入力してください" }]}
            >
              <Input.Password
                prefix={<FontAwesomeIcon icon={faLock} />}
                placeholder="パスワードを入力"
                size="large"
              />
            </Form.Item>
            <div className="form-options">
              <a
                className="forgot-password"
                onClick={() => setOpenForgot(true)}
              >
                パスワードをお忘れですか？
              </a>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              ログイン
            </Button>
          </Form>

          <div className="login-footer">
            <p>© 2026 VTI Academy. All rights reserved.</p>
          </div>
        </div>

        {/* RIGHT INFO */}
        <div className="info-side">
          <div className="info-content">
            <h2>Quiz システム</h2>
            <p>試験と学習成果をプロフェッショナルに管理</p>
          </div>
        </div>
      </div>
      <Quenmatkhau open={openForgot} onClose={() => setOpenForgot(false)} />
    </div>
  );
};

export default Login;
