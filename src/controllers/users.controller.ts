import User from '../models/users.model';
import bcrypt from 'bcrypt';


async function createUser (req: any, res: any, next: Function): Promise<void>{
    try {
        //destructure values from the request body
        const { first_name, last_name, username, email, password } = req.body

        //checks if the user already exists in db
        const userExist = await User.findOne({email: email}).select('-password')

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

            req.flash('success', 'signup successful')
            return res.redirect('/api/dashboard')
        }
    }
    catch (error){
        next(error)
    }
    
}

async function loginUser (req: any, res: any, next: Function): Promise<void>{
    try {
        const { email, password } = req.body
        const user = await User.findOne({'email': email})
        const userMatch = user === null ? false : await bcrypt.compare(password, user.password)
        if (!(user && userMatch)){
            req.flash('error', 'invalid username/password')
            return res.redirect('/api/users/login')
        }
        
        req.session.userId = user._id

        req.flash('success', 'login successful')
        res.redirect('/api/dashboard')
    }
    catch (error){
        next(error)
        
    }
}

async function logout (req: any, res: any, next: Function){
    try {
        req.session.destroy()
        return res.redirect('/api/users/login')

    }
    catch (error){
        next(error)
    }  
}



export default {
    createUser,
    loginUser,
    logout
}