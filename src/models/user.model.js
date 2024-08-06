const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    displayName: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      unique: [true, "Phone number should be unique"],
      required: [true, "User Name is required"],
      validate: {
        validator: function (value) {
          return /^\+2010\d{8}$|^\+2011\d{8}$|^\+2012\d{8}$|^\+2015\d{8}$/.test(
            value
          ); // Validate for Egyptian phone numbers starting with +20 followed by 10, 11, 12, or 15 and 8 digits
        },
        message:
          "Username must be an Egyptian phone number in the format +2010XXXXXXXX, +2011XXXXXXXX, +2012XXXXXXXX, or +2015XXXXXXXX",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (value) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(value); // Validate for at least one digit, one lowercase and one uppercase letter, and between 6 to 20 characters
        },
        message:
          "Password must contain at least one digit, one lowercase and one uppercase letter, and be between 6 to 20 characters long",
      },
    },
    address: {
      type: String,
      required: [true, "Name is required"],
    },
    experienceYears: {
      type: Number,
      required: [true, "Exprience is required"],
    },
    level: {
      type: String,
      enum: ["senior", "fresh", "midLevel", "junior"],
      required: [true, "Level is required"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    roles: {
      type: [String],
      enum: ["user", "admin"],
      default: "user",
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

// Create a method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(enteredPassword, "enterd");
  console.log(this.password, "pass");
  const password = this.password;
  return await bcrypt.compare(enteredPassword, password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
