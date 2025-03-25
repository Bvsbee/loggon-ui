import React from "react";
import { Layout, Avatar, Dropdown, Menu, Input, Button, MenuProps } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const AppLayout: React.FC = () => {
  const nav = useNavigate();
  const { user, logout } = useAuth();

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

  const handleSearch = (value: string) => {
    console.log("Searching:", value);
  };

  const handleClick = () => {
    nav("/login");
  };

  console.log(user?.firstName);

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
      <Header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 50px",
          height: "150px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: "125px", marginTop: "-10px" }}
            />
          </div>

          <div style={{ flex: 2, display: "flex", justifyContent: "center" }}>
            <Search
              placeholder="Search..."
              allowClear
              onSearch={handleSearch}
              style={{
                width: "60%",
                minWidth: "400px",
                maxWidth: "800px",

                border: "2px solid rgba(255, 255, 255, 0.5)",
                borderRadius: "8px",
              }}
              className="custom-search"
            />
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              gap: "20px",
            }}
          >
            <ShoppingCartOutlined
              style={{ fontSize: "24px", cursor: "pointer" }}
            />

            {user ? (
              <Dropdown menu={{ items }} placement="bottomRight">
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  style={{ cursor: "pointer" }}
                />
              </Dropdown>
            ) : (
              <Button onClick={handleClick}>Login</Button>
            )}
          </div>
        </div>

        <div style={{ width: "100%", textAlign: "center", marginTop: "-30px" }}>
          <Menu
            mode="horizontal"
            theme="dark"
            style={{
              background: "transparent",
              borderBottom: "none",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
            defaultSelectedKeys={["home"]}
          >
            <Menu.Item key="home">
              <Link to="/">HOME</Link>
            </Menu.Item>
            <Menu.Item key="shop">SHOP SPECIES</Menu.Item>
            <Menu.Item key="gallery">GALLERY</Menu.Item>
            <Menu.Item key="about">ABOUT</Menu.Item>
            <Menu.Item key="contact">CONTACT</Menu.Item>
          </Menu>
        </div>
      </Header>

      <Content>
        <Outlet />
      </Content>

      <Footer
        style={{
          textAlign: "center",
          padding: "50px",
        }}
      >
        © {new Date().getFullYear()} LoggOn. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default AppLayout;
