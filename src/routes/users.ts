import express from 'express';
import usersController from '../controllers/users.controller';
import isLoggedIn from '../middleware/authenticate';
import checkLogin from '../middleware/checkLogin';

const usersRouter = express.Router()

usersRouter.get('/signup', (req, res) => {
    res.render('signup', {message: req.flash('message'), error: req.flash('error')})
})

usersRouter.get('/login', checkLogin, (req, res) => {
    res.render('login', {message: req.flash('message'), error: req.flash('error')})
})

usersRouter.post('/signup', usersController.createUser)

usersRouter.post('/login', usersController.loginUser)

usersRouter.get('/logout', isLoggedIn, usersController.logout)

export default usersRouter