import Note from "../models/notes.model"
import User from "../models/users.model"


async function getUserNotes (req: any, res: any, next: Function): Promise<void>{
    try {
        //user id from request object
        const id = req.session.userId

        //destructure title keyword/pattern from request query
        const { title } = req.query
        
        //create regex pattern from title query string
        const pattern = new RegExp(title, 'i')

        //create a query object to use in db query
        const findQuery: { [key: string]: any } = {}
        
        if (title){
            findQuery.title = {$in: pattern}
        }

        //query db by author field and regex pattern
        const notes = await Note.find({...findQuery, author: id})
        
        res.status(200).json({
            status: true,
            notes: notes
        })
    } 
    catch (error){
        next (error)
    }
}

async function getNote (req: any, res: any, next: Function): Promise<void>{
    try {
        //get id from request parameters
        const id = req.params.id

        //query db with id 
        const note = await Note.findById(id)
        res.render('noteView', {note, message: req.flash('message'), error: req.flash('error')})
    }
    catch (error){
        console.log(error)
        req.flash('error', 'unexpected error')
        next(error)
    }
}

async function createNote(req: any, res: any, next: Function):Promise<void>{
    try {
        const {title, note} = req.body
        
        //check if note with title already exists
        const pattern = new RegExp(title, 'i')
        const noteInDb = await Note.findOne({title: {$in: pattern}})

        //flash error message if note already exists
        if (noteInDb){
            req.flash('error', 'note with that title already exists')
            return res.redirect('/api/note')
        }
        else {
            const noteToSave = new Note({
                title,
                author: req.session.userId,
                body: note,
                createdAt: new Date()
            }) 
            const savedNote: any = await noteToSave.save()

            //save note to user's notes array
            const userInDb = await User.findById(req.session.userId).select({_id: 1, notes: 1})
            if(userInDb){
                userInDb.notes = userInDb.notes.concat(savedNote._id)
                await userInDb.save()
            }

            req.flash('message', 'note saved successfully')
            setTimeout(() => res.redirect('/api/dashboard'), 500)
        }
    }  
    catch (error){
        next(error)
    }
}

async function modifyNote(req: any, res: any, next: Function):Promise<void>{
    try {
        const { note } = req.body
        const id = req.params.id
        await Note.findByIdAndUpdate(id, {body: note})
       
        req.flash('message', 'note updated successfully')
        res.redirect('/api/dashboard')
    }
    catch (error){
        next(error)
    }
}

async function deleteNote(req: any, _res: any, next: Function): Promise<void>{
    try {
        const id = req.params.id
        await Note.findByIdAndDelete(id)
        req.flash('message', 'note deleted')
    }
    catch (error){
        next(error)
    }
}

export default {
    getUserNotes, 
    getNote,
    createNote,
    modifyNote,
    deleteNote
};