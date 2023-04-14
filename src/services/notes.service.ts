import Note from "../models/notes.model";
import usersService from "./users.service";


async function getMatching(query: object, fields: object){
    const notes =  await Note.find({...query, ...fields})
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

async function updateRecord(noteBody: string, id: string){
    let note = await Note.findById(id)
    if (note){
        note.body = noteBody
        note = await note.save()
        return note
    }  
}

async function deleteRecord(id: string){
    const note = await Note.findByIdAndDelete(id)
    return note
}


export default {
    getMatching,
    getOne,
    newRecord,
    updateRecord,
    deleteRecord
}