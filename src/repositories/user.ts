import "../db";
import User from "../models/user";

export default {
  findByEmail: async (email : string) => User.findOne({ where: { email } }),
  create: async (params: { email : string, password : string }) => User.create(params)
};
