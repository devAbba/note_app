import { Schema, model } from "mongoose";
import { IUser } from '../types';
import bcrypt from 'bcrypt';

const ObjectId = Schema.Types.ObjectId
const userSchema = new Schema<IUser>({
    id: ObjectId,
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ],
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(this, next) {
    const user = this;

    if (!user.isModified('password')){
        return next()
    }

    const hash = await bcrypt.hash(this.password, 10) 
    this.password = hash
    next()
})

userSchema.set('toJSON', {
    transform: (_document, returnedObject: any) => {
        delete returnedObject.__v
        delete returnedObject.password  
    }
})


const User = model<IUser>('User', userSchema)

export default User