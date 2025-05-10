import loggonAPI from "./api";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await loggonAPI.post("/auth/login", credentials);

  return data;
};
export const getProfile = async (email: string, token: string) => {
  const { data } = await loggonAPI.get("user/profile", {
    headers: {
      Authorization: `Bearer ${token}`, // Send the token here
    },
    params: {
      email: email,
    },
  });

  return data;
};
