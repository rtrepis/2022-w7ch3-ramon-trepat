import { model, Schema } from "mongoose";

const itemsSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  userItem: {
    type: String,
    required: true,
  },
});

const Item = model("item", itemsSchema, "items");

export default Item;
