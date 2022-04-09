import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, require: true },
    description: { type: String, require: true },
    date: { type: String, require: true },
    assignedTo: { type: String, require: true },
    priority: {
        type: String,
        require: true,
        enum: ['high', 'medium', 'low']
    },
    duration: { type: String, require: true }
});
