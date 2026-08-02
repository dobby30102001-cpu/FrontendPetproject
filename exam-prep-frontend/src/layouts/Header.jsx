import React, { useContext } from 'react';
import { Dropdown, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { updateProfileApi, changePasswordApi } from '../services/userService';
import '../assets/styles/Header.css';
import { toast } from 'react-toastify';
import Capnhatthongtin from '../components/auth/Capnhatthongtin';
import Capnhatmatkhau from '../components/auth/Capnhatmatkhau';

const Header = () => {
 const { logout, userFullName, refreshUser, user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);

  const handleProfileUpdate = async (values) => {
    try {
      const [firstName, ...lastNameParts] = values.fullName.trim().split(" ");
      const lastName = lastNameParts.join(" ") || "";
      const updateData = {
        firstName,
        lastName,
        email: values.email,
      };
      await updateProfileApi(updateData);
      toast.success("プロフィールを更新しました");
      await refreshUser();
    } catch (error) {
      const msg =
        error.response?.data?.message || "このメールアドレスは既に使用されています";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  const handleChangePassword = async (values) => {
    try {

      await changePasswordApi({
        password: values.currentPassword,
        newPassword: values.newPassword,
      });

    } catch (error) {

      const msg =
        error.response?.data?.message ||
        "パスワードの変更に失敗しました";

      throw new Error(msg);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");

    logout();

    message.success("ログアウトしました");
    window.location.href = "/";
  };

  const menuItems = [
    {
      key: "profile",
      icon: <FontAwesomeIcon icon={faUser} />,
      label: "プロフィール更新",
      onClick: () => setIsModalOpen(true),
    },
    {
      key: "password",
      icon: <FontAwesomeIcon icon={faKey} />,
      label: "パスワード変更",
      onClick: () => setIsPasswordModalOpen(true),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <FontAwesomeIcon icon={faSignOutAlt} />,
      label: "ログアウト",
      danger: true,
      onClick: handleLogout,
    },
  ];

 

  const displayName = userFullName || 'Admin';

  return (
    <header className="header">
      <div className="header-left"></div>

      <div className="header-right">
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <div className="user-info">
            <div className="user-avatar">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span className="user-name">{displayName}</span>
            <FontAwesomeIcon icon={faCog} className="dropdown-icon" />
          </div>
        </Dropdown>
        <Capnhatthongtin
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onUpdate={handleProfileUpdate}
          user={user}
        />
        <Capnhatmatkhau
          open={isPasswordModalOpen}
          onCancel={() => setIsPasswordModalOpen(false)}
          onChangePassword={handleChangePassword}
        />
      </div>
    </header>
  );
};
export default Header;
