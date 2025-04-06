import React, { useState } from 'react';
import { Modal, Row, Col, Descriptions, Button, Space, Typography } from 'antd';
import { ShoppingCartOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;

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

// Define props 
interface ProductModalProps {
  product: Product | null;   // The product to display
  visible: boolean;               
  onClose: () => void;           
  onAddToCart: (product: Product, quantity: number) => void;  // Callback for adding to cart
}

const ProductModal: React.FC<ProductModalProps> = ({ product, visible, onClose, onAddToCart }) => {

  const [cartQuantity, setCartQuantity] = useState(1); 

  //decrease quantity, ensuring it doesn't go below 1
  const decreaseQuantity = () => {
    setCartQuantity(prev => Math.max(1, prev - 1));
  };

  //increase quantity, with max limit based on product stock
  const increaseQuantity = () => {
    if (product) {
      setCartQuantity(prev => Math.min(product.quantity, prev + 1));
    }
  };

  //handle adding product to cart with selected quantity
  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, cartQuantity);
      onClose();
    }
  };

  if (!product) return null;//if no product wont render

  return (
    <Modal
      title={product.name}
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button 
          key="addToCart" 
          type="primary" 
          icon={<ShoppingCartOutlined />} 
          onClick={handleAddToCart}
          disabled={product.quantity <= 0}
        >
          Add to Cart
        </Button>
      ]}
    >
      {/* product image and detail*/}
      <Row gutter={[24, 24]}>
        {/* product image*/}
        <Col xs={24} md={12}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ 
              width: '100%', 
              objectFit: 'contain', 
              maxHeight: '300px',
              borderRadius: '8px',
              padding: '12px'
            }} 
          />
        </Col>
        {/* product details column */}
        <Col xs={24} md={12}>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Price">
              <Text strong>${Number(product.price).toFixed(2)}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Species">{product.species}</Descriptions.Item>
            <Descriptions.Item label="Dimensions">{product.dimensions}</Descriptions.Item>
            {/* stock status*/}
            <Descriptions.Item label="Availability">
              {product.quantity > 5 && <Text type="success">In Stock</Text>}
              {product.quantity <= 5 && product.quantity > 0 && (
                <Text type="warning">Only {product.quantity} left!</Text>
              )}
              {product.quantity <= 0 && <Text type="danger">Out of Stock</Text>}
            </Descriptions.Item>
            {/* quantity selctor*/}
            <Descriptions.Item label="Quantity">
              <Space>
                <Button 
                  icon={<MinusOutlined />} 
                  onClick={decreaseQuantity}
                  disabled={cartQuantity <= 1}
                />
                <Text>{cartQuantity}</Text>
                <Button 
                  icon={<PlusOutlined />} 
                  onClick={increaseQuantity}
                  disabled={cartQuantity >= product.quantity}
                />
                <Text type="secondary">
                  {product.quantity > 0 ? `(${product.quantity} available)` : ''}
                </Text>
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Col>
        {/* product desc*/}
        <Col span={24}>
          <Title level={4}>Description</Title>
          <Paragraph>{product.description}</Paragraph>
        </Col>
      </Row>
    </Modal>
  );
};

export default ProductModal; 