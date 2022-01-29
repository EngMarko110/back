const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: [true, "Email Already Rigesterd"],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  walletBalance: {
    type: Number,
    default: "0",
  },
  /*  apartment: {
        type: String,
        default: ''
    },
    zip :{
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },*/
  country: {
    type: String,
    default: "",
  },
});
/**
 * Validates unique email
 userSchema.path("email").validate(async (email) => {
   const emailCount = await mongoose.models.User.countDocuments({ email });
   return !emailCount;
  }, "Email already exists");
  */

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;
