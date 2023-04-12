import { Schema, model } from 'mongoose';
import { INote } from '../types';

const noteSchema = new Schema<INote>({
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

noteSchema.set('toJSON', {
    transform: (_document, returnedObject: any) => {
        delete returnedObject.__v
    }
})


const Note = model<INote>('Note', noteSchema)

export default Note;