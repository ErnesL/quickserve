import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Please, input the food's name"],
  },
  description: {
    type: String,
    require: [true, "Please, input the food's description"],
  },
});

export default mongoose.models.Food || mongoose.model("Food", FoodSchema);
