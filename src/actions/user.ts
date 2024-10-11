import User from "@/models/User";
import * as bcrypt from "bcrypt";

type UserType = {
  fullName: string;
  email: string;
  password: string;
};

//create a class to contain all methods of the user model
export default class UserActions {
  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  async createUser({ fullName, email, password }: UserType) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    return user;
  }

  async updateUser({ fullName, email, password }: UserType) {
    const user = await User.findOneAndUpdate({ email }, { fullName, password });
    return user;
  }
  async getUserByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  }

  async deleteUser(email: string) {
    const user = await User.findOneAndDelete({ email });
    return user;
  }
  async isPasswordCorrect(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) return false;
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    return isPasswordCorrect;
  }
}
