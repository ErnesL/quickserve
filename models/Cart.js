import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Please, input the food's name"],
    },
    description: {
      type: String,
      require: [true, "Please, input the food's description"],
    },
    ingredients: {
      type: String,
      require: [true, "Please, input the food's ingredients"],
    },
    price: {
      type: Number,
      require: [true, "Please, input the food's cost with the format 0.00"],
    },
    quantity: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    processed: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["entries", "food", "drink", "dessert"],
    },
    orderId: {
      type: Number,
    },
    clientComments: {
      type: String,
    },
  },

  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
