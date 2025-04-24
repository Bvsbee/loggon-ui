import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Table,
  Typography,
  Card,
  Space,
  Tag,
  Tooltip,
  InputNumber,
} from "antd";
import { useState } from "react";
import { useFetchProducts } from "../api/fetch/useFetchProducts";
import Product from "../utils/models/ProductModel";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import loggonAPI from "../api/api";
import AddProductButton from "../components/Admin/AdminDashBoard/AddProductButton";

const { Title, Text } = Typography;

const InventoryManagement = () => {
  const { Item } = Form;
  const [form] = Form.useForm();

  const [visible, setVisible] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [searchText, setSearchText] = useState<string>("");

  const {
    data: products,
    refetch,
    isLoading: productsLoading,
  } = useFetchProducts();

  const handleEdit = (row: Product) => {
    form.setFieldsValue(row);
    setSelectedProduct(row);
    handleEditModalVisibility();
  };

  const handleDelete = async (row: Product) => {
    try {
      setLoading(true);
      const response = await loggonAPI.delete(`product/${row.id}`, {
        headers: {
          "Content-Type": "application/json",
          method: "DELETE",
        },
        params: {
          id: row.id,
        },
      });
      await refetch();
      return response;
    } catch (error) {
      console.error("Error deleting product: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      form
        .validateFields()
        .then(async (values) => {
          const updatedProduct = {
            ...values,
            quantity: Number(values.quantity),
            price: Number(values.price),
          };

          await loggonAPI.patch(
            `product/${selectedProduct?.id}`,
            updatedProduct
          );
          handleEditModalVisibility();
          refetch();
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    } catch (error) {
      console.error("Error updating product: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalVisibility = () => setVisible(!visible);
  const handleEditModalVisibility = () => setEditVisible(!editVisible);

  const handleAddProduct = () => {
    form.resetFields();
    handleModalVisibility();
  };

  // Filter function for search
  const filteredProducts = products?.filter((product: Product) => {
    return Object.values(product).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: "Species",
      dataIndex: "species",
      key: "species",
      sorter: (a: Product, b: Product) => a.species?.localeCompare(b.species),
      render: (_, p: Product) =>
        p.species ? <Tag color="green">{p.species}</Tag> : "-",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a: Product, b: Product) => a.quantity - b.quantity,
      render: (_, p: Product) => {
        const color =
          p.quantity <= 5 ? "red" : p.quantity <= 10 ? "orange" : "green";
        return <Tag color={color}>{p.quantity}</Tag>;
      },
    },
    {
      title: "Dimensions",
      dataIndex: "dimensions",
      key: "dimensions",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (_, p: Product) => (
        <Tooltip title={p.description}>
          <span>{p.description || "-"}</span>
        </Tooltip>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record: Product) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{ backgroundColor: "#5c7a3d" }}
            />
          </Tooltip>
          <Popconfirm
            title="Delete this product?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button
              danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Product Inventory
            <Tooltip title="Manage your product inventory here">
              <InfoCircleOutlined style={{ fontSize: 16, marginLeft: 8 }} />
            </Tooltip>
          </Title>
          <Space>
            <Input
              placeholder="Search products"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
              allowClear
            />
            <AddProductButton
              handleModalVisibility={handleModalVisibility}
              visible={visible}
              refetch={refetch}
            />
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          loading={productsLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          bordered
          size="middle"
          style={{ backgroundColor: "#fff" }}
        />
      </Card>

      {/* Edit Product Modal */}
      <Modal
        title="Edit Product"
        open={editVisible}
        onCancel={handleEditModalVisibility}
        onOk={handleUpdate}
        confirmLoading={loading}
        okText="Update"
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item name="species" label="Species" rules={[{ required: true }]}>
                <Input disabled />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Item>
            </Col>
            <Col span={12}>
              <Item name="price" label="Price ($)" rules={[{ required: true }]}>
                <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
              </Item>
            </Col>
          </Row>
          <Item name="dimensions" label="Dimensions">
            <Input />
          </Item>
          <Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryManagement;
