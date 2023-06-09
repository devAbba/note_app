import express from 'express';
import usersController from '../controllers/users.controller';
import isLoggedIn from '../middleware/authenticate';
import checkLogin from '../middleware/checkLogin';
import userValidator from '../validators/user.validator'

const usersRouter = express.Router()

usersRouter.get('/signup', (req, res) => {
    res.render('signup', {message: req.flash()})
})

usersRouter.get('/login', checkLogin, (req, res) => {
    res.render('login', {message: req.flash()})
})

usersRouter.post('/signup', userValidator.AddUserValidation, usersController.createUser)

usersRouter.post('/login', usersController.loginUser)

usersRouter.get('/logout', isLoggedIn, usersController.logout)

export default usersRouter