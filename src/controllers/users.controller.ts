import User from '../models/users.model';

import bcrypt from 'bcrypt';


async function createUser (req: any, res: any): Promise<void>{
    try {
        //destructure values from the request body
        const { first_name, last_name, username, email, password } = req.body

        //checks if the user already exists in db
        const userExist = await User.findOne({email: email})

        //flash error message if user exists in db
        if (userExist){
            req.flash('error', 'user with that email already exist')
            return res.redirect('/api/users/signup')
        } 
        else {
            //create new user entry in db
            const newUser = new User({
                first_name,
                last_name,
                username,
                email,
                password
            })

            const user = await newUser.save()

            //saves the user id in session cookie
            req.session.userId = user._id

            req.flash('message', 'signup successful')
            res.redirect('/api/dashboard')
        }
    }
    catch (error){
        console.log(error)
        req.flash('error', 'unexpected error')
    }
    
}

async function loginUser (req: any, res: any): Promise<void>{
    try {
        const { email, password } = req.body
        const user = await User.findOne({'email': email})
        const userMatch = user === null ? false : await bcrypt.compare(password, user.password)
        if (!(user && userMatch)){
            req.flash('error', 'invalid username/password')
            return res.redirect('/api/users/login')
        }
        
        req.session.userId = user._id

        req.flash('message', 'login successful')
        res.redirect('/api/dashboard')
    }
    catch (error){
        console.log(error)
        req.flash('error', 'unexpected error')
        res.redirect('/api/users/login')
    }
}

async function logout (req: any, res: any){
    try {
        req.session.destroy()
        res.redirect('/api/users/login')

    }
    catch (error){
        console.log(error)
        req.flash('error', 'unexpected error')
    }  
}



export default {
    createUser,
    loginUser,
    logout
}