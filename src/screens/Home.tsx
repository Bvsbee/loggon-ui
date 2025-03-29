import React from "react";
import { Layout, Button, Row, Col, Card, Carousel } from "antd";
import {
  ShoppingOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const newArrivals = [
  { id: 1, name: "Species1", img: " " },
  { id: 2, name: "Species2", img: " " },
  { id: 3, name: "Species3", img: " " },
];

const bestSellers = [
  { id: 4, name: "Species4", img: " " },
  { id: 5, name: "Species5", img: " " },
  { id: 6, name: "Species6", img: " " },
];

const Home: React.FC = () => {
  return (
    <Content
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0px",
        background: "#FEFAE0",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Company Info & CTA */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
          Welcome to LoggOn!
        </h1>
        <p style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
          Loggon is your trusted source for high-quality exotic wood species. We
          provide premium selections with fast shipping and excellent service.
        </p>
        <Button type="primary" size="large" style={{ margin: "20px" }}>
          Shop Now <ShoppingOutlined />
        </Button>
        <Button
          size="large"
          style={{ margin: "20px", background: "#606c38", color: "white" }}
        >
          Explore Exotic Wood Species
        </Button>
      </div>

      {/* Key Features */}
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={8} style={{ textAlign: "center" }}>
          <RocketOutlined style={{ fontSize: "40px", color: "#606c38" }} />
          <h3>Fast Shipping</h3>
          <p>We ensure quick and reliable shipping to your doorstep.</p>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: "center" }}>
          <SafetyCertificateOutlined
            style={{ fontSize: "40px", color: "#606c38" }}
          />
          <h3>Premium Quality</h3>
          <p>Our wood species are carefully sourced for top-tier quality.</p>
        </Col>
      </Row>

      {/* New Arrivals */}
      <div
        style={{
          marginTop: "50px",
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>New Arrivals</h2>
        <Carousel autoplay dots={{ className: "custom-carousel-dots" }}>
          {newArrivals.map((product) => (
            <div
              key={product.id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.img}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                }
                style={{ width: 300, margin: "50px" }}
              >
                <Card.Meta title={product.name} />
              </Card>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Best Sellers */}
      <div
        style={{
          marginTop: "50px",
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Best Sellers</h2>
        <Carousel autoplay dots={{ className: "custom-carousel-dots" }}>
          {bestSellers.map((product) => (
            <div
              key={product.id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.img}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                }
                style={{ width: 300, margin: "50px" }}
              >
                <Card.Meta title={product.name} />
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </Content>
  );
};

export default Home;
