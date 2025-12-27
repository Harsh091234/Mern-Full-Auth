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

refreshTokenSchema.index({
    createdAt: 1 
},
{
    expireAfterSeconds: 900
});

export  const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);