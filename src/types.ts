import { ObjectId } from "mongodb";

export interface IUser {
    first_name: string;
    last_name: string;
    username?: string;
    notes: Array<ObjectId | undefined>;
    email: string;
    password: string;
}

export interface INote {
    title: string;
    author: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    body: string;
}


