import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    description: String,
    index: Number,
    isCompleted: Boolean
});