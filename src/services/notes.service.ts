import Note from "../models/notes.model";
import { sortBy } from "../types";
import usersService from "./users.service";


async function getMatching(pattern: RegExp, unique_field: Array<string>, order: sortBy = 'createdAt'){

    const findQuery: { [key: string]: any } = {}
    const field: { [key: string]: any } = {}

    findQuery.title = {$in: pattern}
    field[unique_field[0]] = unique_field[1]

    const notes =  await Note.find({...findQuery, ...field}).sort(order)
    return notes
}


async function getOne(fields: object){
    const note = await Note.findOne({...fields})
    return note
}

async function newRecord(data: object, userId: string){
    const noteToSave = new Note(data)
    const savedNote: any = await noteToSave.save()

    //get user details in db and add note to user's collection
    const userInDb = await usersService.getOne('id', userId)
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

async function deleteRecord(note_id: string, user_id: string){
    //find and delete note in db
    const note = await Note.findByIdAndDelete(note_id)

    //get user details from db
    const userInDb = await usersService.getOne('id', user_id)

    //delete the note entry in user's collection
    if (note && userInDb){
        let userId = userInDb._id.toHexString()
        let noteId = note._id.toHexString()
        const res = await usersService.deleteUserNote(userId, noteId)
        if (res){
            return note
        }
    }
    
}


export default {
    getMatching,
    getOne,
    newRecord,
    updateRecord,
    deleteRecord
}