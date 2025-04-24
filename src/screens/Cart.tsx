import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Popconfirm, Row, Table, Tag } from "antd";
import Product from "../utils/models/ProductModel";
import { useQuery } from "@tanstack/react-query";
import fetchCart from "../api/cart/fetchCart";
import { useAuth } from "../context/AuthContext";
import loggonAPI from "../api/api";
import { useNavigate } from "react-router";
import axios from "axios";

const Cart = () => {
  const handleDelete = async (id) => {
    console.log("DeletedId: ", id);

    await axios.delete("http://localhost:3000/cart", id);
    refetch();
  };

  const { user } = useAuth();

  const nav = useNavigate();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(user?.id),
  });

  // const cartError = isError? () => {
  //   return (
  //     <Tag>Error Fetching Cart Data</Tag>
  //   )
  // }

  console.log("data", { data });

  const handleQuantityChange = (value, row) => {
    // Update the quantity of the item in the cart
    // You can send a PUT request to update the cart item
    const updatedCartItem = { ...row, quantity: value };

    // Call your API to update the cart (you can send the updated cart item to the backend)
    updateCartItem(updatedCartItem);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "product?.name", // Access product name
      render: (_, row) => {
        console.log("Row", row);
        return <text>{row.product?.name}</text>;
      },
    },
    {
      title: "Price",
      dataIndex: "product?.price", // Access product price
      render: (_, row) => `$${row.product?.price}`, // Format price
    },
    {
      title: "Dimensions",
      dataIndex: "product?.dimensions",
      render: (_, row) => <text>{row.product?.dimensions}</text>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity", // Access quantity of the cart item
      render: (quantity, row) => (
        <InputNumber
          value={quantity}
          onChange={(value) => handleQuantityChange(value, row)}
          min={1}
        />
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, row) => {
        return (
          <>
            <Popconfirm
              title="Are you sure you want to delete this product?"
              onConfirm={() => handleDelete(row.product?.id)}
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

  const handleCheckout = async () => {
    if (data?.length >= 1) {
      nav("/checkout");
    }
  };

  // const cartData = data.map((p: Product) => ({
  //   ...p,
  //   key: p.id,
  // }));

  // console.log("cartData", cartData);

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
      <Table dataSource={data} columns={columns}></Table>
      <Button onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};

export default Cart;
