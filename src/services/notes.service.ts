import Note from "../models/notes.model";
import usersService from "./users.service";


async function getAll(query: object){
    const notes =  await Note.find(query)
    return notes
}


async function getOne(query: object){
    const note = await Note.findOne(query)
    return note
}

async function newRecord(data: object, userId: string){
    const noteToSave = new Note(data)
    const savedNote: any = await noteToSave.save()

    const userInDb = await usersService.getOne({id: userId})
    if(userInDb){
        userInDb.notes = userInDb.notes.concat(savedNote._id)
        await userInDb.save()
    }

    return savedNote
}

async function updateRecord(data: object, id: string){
    const updatedNote = await Note.findByIdAndUpdate(id, data)
    return updatedNote
}

async function deleteRecord(id: string){
    const note = await Note.findByIdAndDelete(id)
    return note
}


export default {
    getAll,
    getOne,
    newRecord,
    updateRecord,
    deleteRecord
}