import { ObjectId } from "mongodb";

export interface IUser {
    id: ObjectId;
    first_name: string;
    last_name: string;
    username?: string;
    notes: Array<ObjectId>;
    email: string;
    password: string;
}

export interface INote {
    id: ObjectId;
    title: string;
    author: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    body: string;
}