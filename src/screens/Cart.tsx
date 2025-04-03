import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Popconfirm, Row, Table } from "antd";
import { Header } from "antd/es/layout/layout";
import Product from "../utils/models/ProductModel";

const Cart = () => {
  const handleDelete = (row) => {};

  const columns = [
    {
      dataIndex: "image",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, row) => {
        return <InputNumber />;
      },
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, row: Product) => {
        return (
          <>
            <Popconfirm
              title="Are you sure you want to delete this product?"
              onConfirm={() => handleDelete(row)}
              okText="Delete"
            >
              <Button
                style={{ backgroundColor: "#FF5252" }}
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "30px 20px",
        backgroundColor: "#fcf9e8",
      }}
    >
      <h1 style={{ color: "#3a4825", textAlign: "center", marginBottom: 30 }}>
        Your Shopping Cart
      </h1>

      <Table columns={columns}></Table>
    </div>
  );
};

export default Cart;
