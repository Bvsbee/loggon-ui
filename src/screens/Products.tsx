import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Layout, Card, Row, Col, Select, InputNumber, Slider, Space, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { getS3ImageUrl } from '../utils/aws/s3';
//import S3Image from '../components/Admin/S3ImageKey';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

//<S3Image imageKey = "https://loggonbucket.s3.us-east-1.amazonaws.com/purple-heart-lumber-b_234x156.jpg" />

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

//Include an array of fetched images that will be attached to each sample product 

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
    imageUrl: getS3ImageUrl('Honey Locust2.jpg'),
    description: 'Stolen, original link not provided at the moment'
  },
  {
    id: '2',
    name: 'Purple Heart wood thing',
    species: 'Oak',
    price: 89.00,
    dimensions: {
      length: 48,
      width: 24,
      height: 1
    },
    imageUrl: 'https://www.woodworkerssource.com/mm5/graphics/woods_stacks_scans/main_lumber/purple-heart-lumber-b.jpg',
    description: 'these are stolen pictures dont sue me'
  },
  {
    id: '3',
    name: 'Birch Hardwood',
    species: 'Birch',
    price: 65.00,
    dimensions: {
      length: 16,
      width: 16,
      height: 16
    },
    imageUrl: 'https://www.woodworkerssource.com/mm5/graphics/samples/birch-sample_1000x652.jpg',
    description: 'Bundle of premium birch logs'
  },
  {
    id: '4',
    name: 'Pine wood thing',
    species: 'Pine',
    price: 149.99,
    dimensions: {
      length: 36,
      width: 24,
      height: 30
    },
    imageUrl: 'https://www.woodworkerssource.com/mm5/graphics/woods_stacks_scans/main_lumber/poplar-lumber.jpg',
    description: 'Rustic trolley for wood storage and transport'
  },
  {
    id: '5',
    name: 'idk what its called. but looks good',
    species: 'Maple',
    price: 78.50,
    dimensions: {
      length: 12,
      width: 8,
      height: 2
    },
    imageUrl: 'https://www.bellforestproducts.com/_includes/product-photos/43107.jpg',
    description: 'Decorative wooden book stack'
  },
  {
    id: '6',
    name: 'pile of wood ',
    species: 'Cedar',
    price: 95.00,
    dimensions: {
      length: 18,
      width: 18,
      height: 2
    },
    imageUrl: 'https://www.woodworkerssource.com/mm5/graphics/woods_stacks_scans/Walnut/S4S/thin/Walnut_pre-cut_thin_2_4_1000x667.jpg',
    description: 'Natural wood slice wall clock'
  }
];

const Products: React.FC = () => {
  const nav = useNavigate();
  const [products, setImages] = useState<Product[]>(sampleProducts); //Including a set images function
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
  
  //Retrives images 
  /*useEffect(()=> {
    const fetchImages = async ()  => {
      try {const response = await axios.get<Product[]>('http://localhost:5173/products');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    };
    fetchImages();
  }, []);*/

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