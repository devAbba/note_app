import express from 'express';
import noteController from '../controllers/notes.controller';
import noteValidator from '../validators/note.validator';

const notesRouter = express.Router()

notesRouter.get('/', noteController.getUserNotes)

notesRouter.get('/new', noteController.renderNoteForm)

notesRouter.post('/', noteValidator.AddNoteValidation, noteController.createNote)

notesRouter.get('/:slug', noteController.getNote)

notesRouter.get('/e/:slug', noteController.renderEditNote)

notesRouter.patch('/u/:id', noteValidator.UpdateNoteValidation, noteController.modifyNote)

notesRouter.delete('/d/:id', noteController.deleteNote)

export default notesRouter;