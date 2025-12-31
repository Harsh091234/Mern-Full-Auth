import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
           
        },

        token: {
            type: String,
            required: true,
            unique: true,
           
        },

     
       device: {
        deviceId: String,
        userAgent: String,
       }
    },
    { timestamps: true }
);

refreshTokenSchema.pre("save", async function (next) {
 
    if (!this.isModified("token")) return next();

    try {
       
        this.token = await bcrypt.hash(this.token, 10);
        next();
    } catch (error) {
        next(error);
    }
});

refreshTokenSchema.index({
    createdAt: 1 
},
{
    expireAfterSeconds: 900
});

export  const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);