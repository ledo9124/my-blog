import mongoose, { model, Model, Schema } from 'mongoose';

export interface User {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}

const userSchema: Schema = new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModal: Model<User> = mongoose.models.User || model<User>('User', userSchema);

export default UserModal;
