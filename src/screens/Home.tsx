import React, { useState } from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Button,
  Space,
  Spin,
  Alert,
} from "antd";
import { useNavigate } from "react-router";
import { useFetchProducts } from "../api/fetch/useFetchProducts";
import ProductModal from "../components/ProductModal";
import { useMutation } from "@tanstack/react-query";
import addToCart from "../api/cart/addToCart";
import { useAuth } from "../context/AuthContext";

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

interface Product {
  id: string;
  name: string;
  species: string;
  price: number;
  dimensions: string;
  image: string;
  description: string;
  quantity: number;
}

const Home: React.FC = () => {
  const nav = useNavigate();
  const { data: products, isLoading, error } = useFetchProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const { user } = useAuth();

  const { mutate } = useMutation({ mutationFn: addToCart });

  const handleAddToCart = (id: string, cartQuantity: number) => {
    //add to cart functionality
    mutate({ user, id, quantity: cartQuantity });
  };

  //get featured products random 3 products
  const featuredProducts = (products || [])
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <Content
      style={{
        padding: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div
        style={{
          //background: '#f5f5f5',
          padding: "48px 24px",
          textAlign: "center",
          marginBottom: "48px",
          borderRadius: "8px",
        }}
      >
        <Title level={1}>Welcome to Loggon</Title>
        <Paragraph
          style={{ fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}
        >
          Loggon is your trusted source for high-quality exotic wood species. We
          provide premium selections with fast shipping and excellent service.
        </Paragraph>
        <Button
          type="primary"
          size="large"
          onClick={() => nav("/products")}
          style={{ marginTop: "24px" }}
        >
          Shop Now
        </Button>
      </div>

      {/* featured products section*/}
      <div style={{ marginBottom: "48px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
          Featured Products
        </Title>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "48px" }}>
            <Spin size="large" />
          </div>
        ) : error ? (
          <Alert
            message="Error"
            description="Failed to load products. Please try again later.(not connect to backend)"
            type="error"
            showIcon
          />
        ) : featuredProducts.length === 0 ? (
          <Alert
            message="No Products Available"
            description="There are no featured products at the moment."
            type="info"
            showIcon
          />
        ) : (
          <Row gutter={[24, 24]} justify="center">
            {featuredProducts.map((product: Product) => (
              <Col xs={24} sm={12} md={8} key={product.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={product.name}
                      src={product.image}
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        borderRadius: "8px",
                        padding: "12px",
                      }}
                    />
                  }
                  onClick={() => handleProductClick(product)}
                >
                  <Card.Meta
                    title={product.name}
                    description={
                      <Space direction="vertical">
                        <Text strong>${Number(product.price).toFixed(2)}</Text>
                        <Text type="secondary">{product.species}</Text>
                        {product.quantity > 5 && (
                          <Text type="success">In Stock</Text>
                        )}
                        {product.quantity <= 5 && product.quantity > 0 && (
                          <Text type="warning">
                            Only {product.quantity} left!
                          </Text>
                        )}
                        {product.quantity <= 0 && (
                          <Text type="danger">Out of Stock</Text>
                        )}
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        visible={isModalVisible}
        onClose={handleModalClose}
        onAddToCart={handleAddToCart}
      />
    </Content>
  );
};

export default Home;
