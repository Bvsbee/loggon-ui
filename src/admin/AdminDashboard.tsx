import { Layout, Menu, Table } from "antd";
import AddProductButton from "../components/Admin/AdminDashBoard/AddProductButton";
import { useState } from "react";

const AdminDashboard = () => {
  const { Content, Sider } = Layout;

  const [visible, setVisible] = useState<boolean>(false);

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
  ];

  const handleModalVisibility = () => setVisible(!visible);

  return (
    <div>
      <AddProductButton
        handleModalVisibility={handleModalVisibility}
        visible={visible}
      />
      <div>
        <Table columns={columns}></Table>
      </div>
    </div>
  );
};

export default AdminDashboard;
