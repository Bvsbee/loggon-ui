import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Select,
  InputNumber,
  Slider,
  Space,
  Typography,
  Spin,
  Alert,
} from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { useFetchProducts } from "../api/fetch/useFetchProducts";
//import { ShoppingCartOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ProductModal from "../components/ProductModal";
import { useMutation } from "@tanstack/react-query";
import addToCart from "../api/cart/addToCart";
import { useAuth } from "../context/AuthContext";

//const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

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

const Products: React.FC = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { data: productData, isLoading, error } = useFetchProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("price-asc");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);

  useEffect(() => {
    if (productData) {
      let filteredProducts = [...productData];

      // search filter
      if (searchQuery) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setProducts(filteredProducts);
    }
  }, [productData, searchQuery]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCartQuantity(1); //set quantity to 1
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setCartQuantity(1);
  };

  const { mutate } = useMutation({ mutationFn: addToCart });

  const { user } = useAuth();

  const handleAddToCart = (id: string, cartQuantity: number) => {
    //implement add to cart functionality here
    console.log("Adding to cart:", id, "Quantity:", cartQuantity);

    mutate({ user, id, quantity: cartQuantity });
  };

  const filteredProducts = products
    .filter(
      (product) =>
        Number(product.price) >= priceRange[0] &&
        Number(product.price) <= priceRange[1] &&
        (selectedSpecies.length === 0 ||
          selectedSpecies.includes(product.species))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return Number(a.price) - Number(b.price);
        case "price-desc":
          return Number(b.price) - Number(a.price);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const uniqueSpecies = [...new Set(products.map((p) => p.species))];

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "24px" }}>
        <Alert
          message="Error loading products"
          description="We couldn't load the products. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Title level={2}>Wood Species</Title>
            <Space>
              <Text>{filteredProducts.length} products</Text>
              <a
                onClick={() => setShowFilters(!showFilters)}
                style={{ marginLeft: 16 }}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </a>
            </Space>
          </div>

          {showFilters && (
            <Card style={{ marginBottom: 24 }}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <div>
                  <Text strong>Price Range</Text>
                  <Slider
                    range
                    min={0}
                    max={priceRange[1] > 200 ? priceRange[1] : 200}
                    value={priceRange}
                    onChange={(value: number[]) =>
                      setPriceRange(value as [number, number])
                    }
                    style={{ width: "100%" }}
                  />
                  <Space>
                    <InputNumber
                      min={0}
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(value) =>
                        setPriceRange([value || 0, priceRange[1]])
                      }
                    />
                    <Text>to</Text>
                    <InputNumber
                      min={priceRange[0]}
                      max={priceRange[1] * 2}
                      value={priceRange[1]}
                      onChange={(value) =>
                        setPriceRange([priceRange[0], value || priceRange[1]])
                      }
                    />
                  </Space>
                </div>

                <div>
                  <Text strong>Species</Text>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Select wood species"
                    value={selectedSpecies}
                    onChange={setSelectedSpecies}
                  >
                    {uniqueSpecies.map((species) => (
                      <Option key={species} value={species}>
                        {species}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Text strong>Sort By</Text>
                  <Select
                    style={{ width: 200 }}
                    value={sortBy}
                    onChange={setSortBy}
                  >
                    <Option value="price-asc">Price: Low to High</Option>
                    <Option value="price-desc">Price: High to Low</Option>
                    <Option value="name-asc">Name: A to Z</Option>
                    <Option value="name-desc">Name: Z to A</Option>
                  </Select>
                </div>
              </Space>
            </Card>
          )}

          {filteredProducts.length === 0 && !isLoading ? (
            <Alert
              message="No products found"
              description="Try adjusting your filters to see more products."
              type="info"
              showIcon
            />
          ) : (
            <Row gutter={[24, 24]}>
              {filteredProducts.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={product.name}
                        src={product.image}
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    }
                    onClick={() => handleProductClick(product)}
                  >
                    <Card.Meta
                      title={product.name}
                      description={
                        <Space direction="vertical" size={0}>
                          <Text strong>
                            ${Number(product.price).toFixed(2)}
                          </Text>
                          <Text type="secondary">{product.species}</Text>
                          <Text type="secondary">{product.dimensions}</Text>
                          {product.quantity <= 5 && product.quantity > 0 && (
                            <Text type="warning">
                              Only {product.quantity} left!
                            </Text>
                          )}
                          {product.quantity === 0 && (
                            <Text type="danger">Out of stock</Text>
                          )}
                        </Space>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Space>
      </div>

      <ProductModal
        product={selectedProduct}
        visible={isModalVisible}
        onClose={handleModalClose}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Products;
