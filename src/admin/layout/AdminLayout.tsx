import { Outlet } from "react-router";
import styles from "../../styles/AuthLayout.module.css";
import { Avatar, Dropdown, Layout, Menu, MenuProps } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

const AdminLayout = () => {
  const { Header, Footer, Content, Sider } = Layout;
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Profile dropdown menu items
  const profileItems: MenuProps["items"] = [
    {
      label: <Link to="/profile">Profile</Link>,
      key: "0",
    },
    {
      label: <Link to="/settings">Settings</Link>,
      key: "1",
    },
    {
      label: <span>Logout</span>,
      key: "2",
      onClick: () => {
        logout();
      },
    },
  ];

  // Sider menu items
  const siderItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "products",
      icon: <ShoppingOutlined />,
      label: <Link to="/admin/inventory">Product Management</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        style={{
          boxShadow: "2px 0 8px 0 rgba(29,35,41,.05)",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            height: "64px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            background: "#5c7a3d",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {!collapsed && "LoggOn Admin"}
          {collapsed && "LO"}
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={siderItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: "#5c7a3d",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
            boxShadow: "0 1px 4px rgba(0,21,41,.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
                style: {
                  fontSize: "18px",
                  color: "white",
                  marginRight: "24px",
                  cursor: "pointer",
                },
              }
            )}
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>LoggOn</span>
          </div>
          <Dropdown menu={{ items: profileItems }} placement="bottomRight">
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar icon={<UserOutlined />} />
              <span style={{ marginLeft: "8px", color: "white" }}>Admin</span>
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
            borderRadius: "4px",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            padding: "12px 50px",
            background: "#f9fafb",
          }}
        >
          © {new Date().getFullYear()} LoggOn. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
