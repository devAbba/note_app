import express from 'express';
import User from '../models/users.model';


const profileRouter = express.Router();

profileRouter.get('/', async (req: any, res): Promise<void> => {
    const user = await User.findById(req.session.userId).select('-password')
    res.render('profile', {user, message: req.flash('message'), error: req.flash('error')})
});

profileRouter.patch('/update', async (req: any, res): Promise<void> => {
    try {
    const id = req.session.userId
    const { first_name, last_name, username } = req.body
    await User.findByIdAndUpdate(id, {
        first_name,
        last_name,
        username
    })
    
    req.flash('message', 'saved successfully')
    res.redirect('/api/profile')
    
    }
    catch(error){
        console.log(error)
        req.flash('error', 'error saving')
        res.redirect('/api/profile')
    }

})


export default profileRouter;