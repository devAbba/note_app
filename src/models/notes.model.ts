import { Schema, model } from 'mongoose';
import { INote } from '../types';

const ObjectId = Schema.Types.ObjectId
const noteSchema = new Schema<INote>({
    id: ObjectId,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
})

noteSchema.pre('save', function (this, next){
    const note = this;
    note.updatedAt = new Date()
    return next()
})


const Note = model<INote>('Note', noteSchema)

export default Note;