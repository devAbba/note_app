import User from "../models/users.model"

async function renderProfile(req: any, res: any): Promise<void> {
    const user = await User.findById(req.session.userId).select('-password')
    res.render('profile', {message: req.flash(), user})
}

async function updateProfile(req: any, res: any): Promise<void> {
    try {
        const id = req.session.userId
        const { first_name, last_name, username } = req.body
        await User.findByIdAndUpdate(id, {
            first_name,
            last_name,
            username
        })
        
        req.flash('success', 'saved successfully')
        return res.redirect('/api/profile')
        
    }
    catch(error){
        console.log(error)
        req.flash('error', 'error saving')
        res.redirect('/api/profile')
    } 
}

export default {
    renderProfile,
    updateProfile
}