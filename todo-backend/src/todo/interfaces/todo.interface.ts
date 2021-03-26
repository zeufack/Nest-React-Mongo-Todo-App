import { Document } from 'mongoose';

export interface Todo extends Document {
    readonly description: string;
    readonly index: number;
    readonly isCompleted: boolean;
}
