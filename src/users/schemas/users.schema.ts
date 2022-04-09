import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true }
});
