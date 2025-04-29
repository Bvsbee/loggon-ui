import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import fetchAdminDashboard from "../api/admin/fetchAdminDashBoard";
import SalesChart from "../components/SalesChart";

const AdminDashboard = () => {
  const { user } = useAuth();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: () => fetchAdminDashboard(user?.id),
  });

  console.log(data);

  return (
    <div>
      <SalesChart />
    </div>
  );
};

export default AdminDashboard;
