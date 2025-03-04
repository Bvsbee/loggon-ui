import React from "react";
import { Layout, Avatar, Dropdown, Menu, Input, Button } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const AppLayout: React.FC = () => {
  const userMenu = (
    <Menu
      items={[
        { key: "1", label: "Profile" },
        { key: "2", label: "Settings" },
        { key: "3", label: "Logout" },
      ]}
    />
  );

  const handleSearch = (value: string) => {
    console.log("Searching:", value);
  };

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
      <Header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 50px",
          height: "140px",
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

            <Dropdown overlay={userMenu} placement="bottomRight">
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
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
          >
            <Menu.Item key="home">HOME</Menu.Item>
            <Menu.Item key="shop">SHOP SPECIES</Menu.Item>
            <Menu.Item key="gallery">GALLERY</Menu.Item>
            <Menu.Item key="about">ABOUT</Menu.Item>
            <Menu.Item key="contact">CONTACT</Menu.Item>
          </Menu>
        </div>
      </Header>

      <Content
        style={{
          flexGrow: 1,
          width: "100%",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button>Hello</Button>
        <h1>blah blah blah</h1>
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
