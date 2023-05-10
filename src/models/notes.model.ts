import { Schema, model } from 'mongoose';
import { INote } from '../types';
import { marked } from 'marked';
import slugify from 'slugify';
import createDomPurify from 'dompurify';
import { JSDOM } from 'jsdom';

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: true
});

const dompurify = createDomPurify(new JSDOM().window)

const noteSchema = new Schema<INote>({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: Date,
    updatedAt: Date,
    slug: {
        type: String,
        required: true,
        unique: false
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

noteSchema.pre('validate', function (next){
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if (this.body) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.body))
    }

    next()
})

noteSchema.pre('save', function (next){
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