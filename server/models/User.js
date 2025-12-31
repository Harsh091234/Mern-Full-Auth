import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 6,
      maxlength: 50,
      trim: true,
      match: [
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9.@]+$/,
        "Email must contain letters, numbers and only '.' or '@' as special characters",
      ],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 64,
    },

    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      trim: true,
      match: [
        /^[A-Za-z_]+$/,
        "Name can contain only letters and underscores (_)",
      ],
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export  const User = mongoose.model("User", userSchema);