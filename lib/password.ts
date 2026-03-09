import bcrypt from "bcryptjs";

export const cryptPassword = async (password: string) => {
  return await bcrypt.hash(password || "", 10);
};
