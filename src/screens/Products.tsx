import React, { useState } from 'react';
import { Layout, Card, Row, Col, Select, InputNumber, Slider, Space, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { getS3ImageUrl } from '../utils/aws/s3';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

interface Product {
  id: string;
  name: string;
  species: string;
  price: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  imageUrl: string;
  description: string;
}

// Sample products data until we get real data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Oh Sweet Honey',
    species: 'Honey Locust',
    price: 125.00,
    dimensions: {
      length: 24,
      width: 16,
      height: 12
    },
    imageUrl: getS3ImageUrl('HoneyLocust/Honey Locust2.jpg'),
    description: 'This is stolen'
  },
  {
    id: '2',
    name: "Ash Wednesday",
    species: 'Ash',
    price: 89.00,
    dimensions: {
      length: 48,
      width: 24,
      height: 1
    },
    imageUrl: getS3ImageUrl('Ash/Ash Wood.webp'),
    description: 'Also stolen'
  },
  {
    id: '3',
    name: "It's red",
    species: 'Aromatic Red Cedar',
    price: 65.00,
    dimensions: {
      length: 16,
      width: 16,
      height: 16
    },
    imageUrl: getS3ImageUrl('AromaticRedCedar/Red Cedar.jpg'),
    description: 'Premium would, with a stolen image'
  },
  {
    id: '4',
    name: 'The king of wood',
    species: 'Kingwood',
    price: 149.99,
    dimensions: {
      length: 36,
      width: 24,
      height: 30
    },
    imageUrl: getS3ImageUrl('Kingwood/Kingwood.jpg'),
    description: 'Royalty is always stolen, just like this image'
  },
  {
    id: '5',
    name: 'Type of wood',
    species: 'Black Limba',
    price: 78.50,
    dimensions: {
      length: 12,
      width: 8,
      height: 2
    },
    imageUrl: getS3ImageUrl('BlackLimba/Black Limba2.jpg'),
    description: 'Fancy names are usually stolen'
  },
  {
    id: '6',
    name: 'Mangos grow on trees',
    species: 'Figured Mango',
    price: 95.00,
    dimensions: {
      length: 18,
      width: 18,
      height: 2
    },
    imageUrl: getS3ImageUrl('FiguredMango/Figured Mango2.jpg'),
    description: 'Stolen'
  }
];

const Products: React.FC = () => {
  const nav = useNavigate();
  const [products] = useState<Product[]>(sampleProducts);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('price-asc');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products
    .filter(product => 
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedSpecies.length === 0 || selectedSpecies.includes(product.species))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const uniqueSpecies = [...new Set(products.map(p => p.species))];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Title level={2}>Wood Species</Title>
            <Space>
              <Text>{filteredProducts.length} products</Text>
              <a onClick={() => setShowFilters(!showFilters)} style={{ marginLeft: 16 }}>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </a>
            </Space>
          </div>

          {showFilters && (
            <Card style={{ marginBottom: 24 }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Text strong>Price Range</Text>
                  <Slider
                    range
                    min={0}
                    max={200}
                    value={priceRange}
                    onChange={(value: number[]) => setPriceRange(value as [number, number])}
                    style={{ width: '100%' }}
                  />
                  <Space>
                    <InputNumber
                      min={0}
                      max={200}
                      value={priceRange[0]}
                      onChange={value => setPriceRange([value || 0, priceRange[1]])}
                    />
                    <Text>to</Text>
                    <InputNumber
                      min={0}
                      max={200}
                      value={priceRange[1]}
                      onChange={value => setPriceRange([priceRange[0], value || 200])}
                    />
                  </Space>
                </div>

                <div>
                  <Text strong>Species</Text>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Select wood species"
                    value={selectedSpecies}
                    onChange={setSelectedSpecies}
                  >
                    {uniqueSpecies.map(species => (
                      <Option key={species} value={species}>{species}</Option>
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

          <Row gutter={[24, 24]}>
            {filteredProducts.map(product => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={product.name}
                      src={product.imageUrl}
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                  }
                  onClick={() => nav(`/product/${product.id}`)}
                >
                  <Card.Meta
                    title={product.name}
                    description={
                      <Space direction="vertical" size={0}>
                        <Text strong>${product.price.toFixed(2)}</Text>
                        <Text type="secondary">{product.species}</Text>
                        <Text type="secondary">
                          {`${product.dimensions.length}"L x ${product.dimensions.width}"W x ${product.dimensions.height}"H`}
                        </Text>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Space>
      </div>
    </div>
  );
};

export default Products; 