import mongoose from 'mongoose';

const refereshTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
    
    }
)

export const RefreshToken = mongoose.model("refreshTokens", refereshTokenSchema);