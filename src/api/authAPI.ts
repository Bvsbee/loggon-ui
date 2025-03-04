import loggonAPI from "./api";

export const registerUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await loggonAPI.post("/auth/login", credentials);

  return data;
};
