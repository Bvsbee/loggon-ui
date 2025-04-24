import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import fetchAdminDashboard from "../api/admin/fetchAdminDashBoard";

const AdminDashboard = () => {
  const { user } = useAuth();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: () => fetchAdminDashboard(user?.id),
  });

  console.log(data);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin Dashboard</h2>
      <div style={{ marginTop: "1rem" }}>
        <p>
          <strong>Total Users:</strong> {data?.totalUsers}
        </p>
        <p>
          <strong>Total Products:</strong> {data?.totalProducts}
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
