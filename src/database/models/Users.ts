import { model, Schema } from "mongoose";

const usersSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("user", usersSchema, "users");

export default User;
