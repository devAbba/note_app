import usersService from "../services/users.service"

async function renderProfile(req: any, res: any): Promise<void> {
    //get userId from session cookie
    const userId = req.session.userId

    //get user data
    const user = await usersService.getOne({_id: userId})

    res.render('profile', {message: req.flash(), user})
}

async function updateProfile(req: any, res: any): Promise<void> {
    try {
        const id = req.session.userId
        const { first_name, last_name, username } = req.body

        await usersService.updateRecord(id, {
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