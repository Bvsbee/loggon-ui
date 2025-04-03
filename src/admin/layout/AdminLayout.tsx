import { Outlet } from "react-router";
import styles from "../../styles/AuthLayout.module.css";
import { Avatar, Dropdown, Layout, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { Header, Footer, Content, Sider } = Layout;

  const { logout } = useAuth();

  const items: MenuProps["items"] = [
    {
      label: <a href="/profile">Profile</a>,
      key: "0",
    },
    {
      label: <a href="/settings">Settings</a>,
      key: "1",
    },
    {
      label: <a href="/">Logout</a>,
      key: "2",
      onClick: () => {
        logout();
      },
    },
  ];

  return (
    <Layout>
      <Header className={styles.header}>
        <a href="/">LoggOn</a>
      </Header>

      <Content>
        <Outlet />
      </Content>

      <Footer className={styles.footer}>
        © {new Date().getFullYear()} LoggOn. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default AdminLayout;
