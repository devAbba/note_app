import express from 'express';
import User from '../models/users.model';
import Note from '../models/notes.model';


const dbRouter = express.Router();

dbRouter.get('/', async (req: any, res): Promise<void> => {
    const user = await User.findById(req.session.userId).select({first_name: 1, last_name: 1, username: 1})
    const notes = await Note.find({author: req.session.userId})
    res.render('dashboard', {user, notes, message: req.flash()})
});


export default dbRouter;