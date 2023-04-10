import express from 'express';
import Note from '../models/notes.model'
import noteController from '../controllers/notes.controller';

const notesRouter = express.Router()

notesRouter.get('/', noteController.getUserNotes)

notesRouter.get('/new', (req, res) => {
    res.render('noteform.ejs', {message: req.flash('message'), error: req.flash('error'), note: new Note()})
})

notesRouter.post('/', noteController.createNote)

notesRouter.get('/:id', noteController.getNote)

notesRouter.get('/e/:id', async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id)
        res.render('notePatch', {note, message: req.flash('message'), error: req.flash('error')})
    }
    catch (error){
        console.log(error)
        req.flash('error', 'unexpected error')
        next(error)
    }
    
})

notesRouter.patch('/u/:id', noteController.modifyNote)

notesRouter.delete('/d/:id', noteController.deleteNote)

export default notesRouter;