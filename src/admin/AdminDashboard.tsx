import { Table } from "antd";
import AddProductButton from "../components/Admin/AdminDashBoard/AddProductButton";
import { useEffect, useState } from "react";
import { getProducts } from "../api/fetch/useFetchProducts";
import Product from "../classses/Product";

const AdminDashboard = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products]);

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
        <Table columns={columns} dataSource={products}></Table>
      </div>
    </div>
  );
};

export default AdminDashboard;
