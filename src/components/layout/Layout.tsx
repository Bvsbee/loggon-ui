import React, { useEffect, useState } from "react";
import {
  Layout,
  Avatar,
  Dropdown,
  Menu,
  Input,
  Button,
  MenuProps,
  Badge,
  Row,
  Col,
} from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router";
import { getCart } from "../../api/fetch/fetchCartItems";
import { useQuery } from "@tanstack/react-query";
import fetchCart from "../../api/cart/fetchCart";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const AppLayout: React.FC = () => {
  const nav = useNavigate();
  const { user, logout } = useAuth();

  const [cartData, setCartData] = useState<Cart>(undefined);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["checkout"],
    queryFn: () => fetchCart(user?.id),
    enabled: !!user?.id,
  });

  const products = [
    {
      label: "Hardwood",
      options: [
        { label: "Oak", value: "Oak", category: "Hardwood" },
        { label: "Maple", value: "Maple", category: "Hardwood" },
        { label: "Walnut", value: "Walnut", category: "Hardwood" },
      ],
    },
    {
      label: "Softwood",
      options: [
        { label: "Pine", value: "Pine", category: "Softwood" },
        { label: "Cedar", value: "Cedar", category: "Softwood" },
        { label: "Fir", value: "Fir", category: "Softwood" },
      ],
    },
  ];

  console.log("Cart", data?.items?.lengths);
  const items: MenuProps["items"] = [
    ...(user?.isAdmin
      ? [
          {
            label: <a href="/admin">Admin Dashboard</a>,
            key: "3",
          },
        ]
      : []),
    {
      label: <a href="/">Logout</a>,
      key: "2",
      onClick: () => {
        logout();
        nav("/");
      },
    },
  ];

  const handleSearch = (value: string) => {
    console.log("Searching:", value);
    if (value.trim()) {
      nav(`/products?search=${encodeURIComponent(value.trim())}`);
    }
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
              justifyContent: "flex-start",
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: "100px", marginTop: "10px", cursor: "pointer" }}
              onClick={() => nav("/")} //go to home page on clicking logo
            />
          </div>

          <div style={{ flex: 2, display: "flex", justifyContent: "center" }}>
            <Search
              placeholder="Search for wood here"
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
            <Badge count={data?.length || 0} size="small" offset={[-2, 2]}>
              <ShoppingCartOutlined
                onClick={() => nav("/cart")}
                style={{ fontSize: "24px", cursor: "pointer" }}
              />
            </Badge>

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
            <Menu.Item key="products">
              <Link to="/products">PRODUCTS</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Header>
      <Content>
        <Outlet />
      </Content>

      <Footer
        style={{
          backgroundColor: "#606c37",
          color: "white",
          textAlign: "center",
          padding: "50px 0",
        }}
      >
        <Row justify="space-around" align="top">
          <Col span={6}>
            <h3 style={{ color: "white" }}>Contact Us</h3>
            <ul style={{ color: "white" }}>
              <li>Email: LoggonSupport@example.com</li>
              <li>Phone: 123-456-7890</li>
            </ul>
          </Col>
          <Col span={6}>
            <h3 style={{ color: "white" }}>Products</h3>
            <ul style={{ color: "white" }}>
              <h4 style={{ color: "white" }}>Hardwood</h4>
              <li>Oak</li>
              <li>Maple</li>
              <li>Walnut</li>

              <h4 style={{ color: "white" }}>Softwood</h4>
              <li>Pine</li>
              <li>Cedar</li>
              <li>Fir</li>
            </ul>
          </Col>
          <Col span={6}>
            <h3 style={{ color: "white" }}>About Us</h3>
            <ul style={{ color: "white" }}>
              <li>
                <a href="/about" style={{ color: "white" }}>
                  Our Story
                </a>
              </li>
              <li>
                <a href="/team" style={{ color: "white" }}>
                  Our Team
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <div style={{ textAlign: "center", marginTop: "30px", color: "white" }}>
          © {new Date().getFullYear()} LoggOn. All rights reserved.
        </div>
      </Footer>
    </Layout>
  );
};

export default AppLayout;
