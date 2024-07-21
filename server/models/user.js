import { model, Schema, ObjectId } from "mongoose";

const schema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,  
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 256,
    },
    avatar:{
      type:String,
      default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    address: { type: String, default: "" },
    company: { type: String, default: "" },
    phone: { type: String, default: "" },
    photo: {},
    role: {
      type: [String],
      default: ["Buyer"],
      enum: ["Buyer", "Seller", "Admin"],
    },
    enquiredProperties: [{ type: ObjectId, ref: "Ad" }],
    wishlist: [{ type: ObjectId, ref: "Ad" }],
    resetCode: {
      type: String, // If it's a simple one-time code
    },
  },
  { timestamps: true }
);

export default model("User", schema);