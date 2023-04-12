import express from 'express';
import noteController from '../controllers/notes.controller';

const notesRouter = express.Router()

notesRouter.get('/', noteController.getUserNotes)

notesRouter.get('/new', noteController.renderNoteForm)

notesRouter.post('/', noteController.createNote)

notesRouter.get('/:id', noteController.getNote)

notesRouter.get('/e/:id', noteController.renderEditNote)

notesRouter.patch('/u/:id', noteController.modifyNote)

notesRouter.delete('/d/:id', noteController.deleteNote)

export default notesRouter;