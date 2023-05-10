import Note from "../models/notes.model"
import notesService from "../services/notes.service"


async function getUserNotes (req: any, res: any, next: Function): Promise<void>{
    try {
        //matches all if no query is provided
        let pattern = /.*/

        //user id from request object
        const user_id = req.session.userId

        //destructure title from request query
        const { title } = req.query

        if (title){
            pattern = new RegExp(title, 'i')
        }
        
        //query db by author field and regex pattern
        const notes = await notesService.getMatching(pattern, ['author', user_id])
        
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
        //get query string from request parameters
        const query_string = req.params.slug
        const user_id = req.session.userId

        //query db with id 
        const note = await notesService.getOne({slug: query_string, author: user_id})

        res.render('noteView', {note, message: req.flash()})
    }
    catch (error){
        next(error)
    }
}

async function createNote(req: any, res: any, next: Function):Promise<void>{
    try {
        const {title, body} = req.body
        const user_id = req.session.userId
        
        //check if note with title already exists
        const pattern = new RegExp(title, 'i')
        const noteInDb = await notesService.getMatching(pattern, ['author', user_id])

        //flash error message if note already exists
        if (noteInDb.length > 0){
            req.flash('error', 'save error: note with that title already exists')
            return res.redirect('/api/note/new')
        }
        else {
            const note_data = {
                title,
                author: user_id,
                body,
                createdAt: new Date()
            }

            await notesService.newRecord(note_data, user_id)

            req.flash('success', 'note saved successfully')
            setTimeout(() => res.redirect('/api/dashboard'), 500)
        }
    }  
    catch (error){
        next(error)
    }
}

async function modifyNote(req: any, res: any, next: Function):Promise<void>{
    try {
        
        const { body } = req.body
        const id = req.params.id

        const record = await notesService.updateRecord(body, id)

        if (record){
            const slug = record.slug
            req.flash('success', 'note updated successfully')
            res.redirect(`/api/note/${slug}`)
        }
         
    }
    catch (error){
        next(error) 
    }
}

async function deleteNote(req: any, res: any, next: Function): Promise<void>{
    try {
        const userId = req.session.userId

        //get noteId from query params
        const note_id = req.params.id

        //delete note from db
        const note = await notesService.deleteRecord(note_id, userId)

        //flash success message if successful
        if (note){
            req.flash('success', `${note.title} deleted`)
            return res.redirect('/api/dashboard')
        }
        
    }
    catch (error){
        next(error)
    }
}

function renderNoteForm(req: any, res: any): void {
    res.render('noteform.ejs', {message: req.flash(), note: new Note()})
}

async function renderEditNote(req: any, res: any, next: Function): Promise<void>{
    try {
        const slug = req.params.slug
        const user_id = req.session.userId
        const note = await notesService.getOne({slug: slug, author: user_id})
        res.render('notePatch', {message: req.flash(), note})
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
    deleteNote,
    renderNoteForm,
    renderEditNote
};