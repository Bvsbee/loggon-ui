import { Button, Form, Input, Modal, Popconfirm, Row, Table } from "antd";
import AddProductButton from "../components/Admin/AdminDashBoard/AddProductButton";
import { useState } from "react";
import { useFetchProducts } from "../api/fetch/useFetchProducts";
import Product from "../classses/Product";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import loggonAPI from "../api/api";

const AdminDashboard = () => {
  const { Item } = Form;

  const [form] = Form.useForm();

  const [visible, setVisible] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);

  // const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  const { data: products, refetch } = useFetchProducts();

  const handleEdit = (row: Product) => {
    console.log(row);
    form.setFieldsValue(row);
    handleEditModalVisibility();
  };

  const handleDelete = async (row: Product) => {
    try {
      const response = await loggonAPI.delete(`product/${row.id}`, {
        headers: {
          // Authorization: `Bearer ${token}`, // Send the token here\
          "Content-Type": "application/json",
          method: "DELETE",
        },
        params: {
          id: row.id,
        },
      });

      return response;
    } catch (error) {
      console.log("Error deleting product: ", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await loggonAPI.patch(`product/${selectedProduct?.id}`, {
        headers: {
          // Authorization: `Bearer ${token}`, // Send the token here\
          "Content-Type": "application/json",
          method: "PATCH",
        },
        params: {
          id: selectedProduct?.id,
          description: selectedProduct?.description,
          quantity: selectedProduct?.quantity,
          price: selectedProduct?.price,
        },
      });

      return response;
    } catch (error) {
      console.log("Error updating product: ", error);
    }

    handleEditModalVisibility();
    refetch();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, row) => {
        return (
          <>
            <Button
              onClick={() => handleEdit(row)}
              icon={<EditOutlined />}
            ></Button>

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

  const handleModalVisibility = () => setVisible(!visible);
  const handleEditModalVisibility = () => setEditVisible(!visible);

  return (
    <div>
      <AddProductButton
        handleModalVisibility={handleModalVisibility}
        visible={visible}
        refetch={refetch}
      />
      <div>
        <Table columns={columns} dataSource={products}></Table>
      </div>

      <Modal
        title="Product Editing"
        open={editVisible}
        onCancel={handleEditModalVisibility}
        onOk={handleUpdate}
      >
        <Form form={form} onValuesChange={setSelectedProduct}>
          <Row>
            <Item name="name" label="Name">
              <Input disabled />
            </Item>
            <Item name="description" label="Description">
              <Input />
            </Item>
            <Item name="category" label="Category">
              <Input disabled />
            </Item>
            <Item name="quantity" label="Quantity">
              <Input />
            </Item>
            <Item name="price" label="Price">
              <Input />
            </Item>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
