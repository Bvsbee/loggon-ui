import loggonAPI from "../api";

const fetchAdminDashboard = async (userId: string | undefined) => {
  try {
    const res = await loggonAPI.get(`/admin/summary?userId=${userId}`);

    return res.data;
  } catch (error: Error) {
    console.error(
      "Error fetching Admin Dashboard Statistics",
      error.response?.data || error.message
    );
    throw Error;
  }
};

export default fetchAdminDashboard;
