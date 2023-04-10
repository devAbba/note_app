import express from 'express';
import connectDB from './database/mongodb';
import usersRouter from './routes/users';
import dbRouter from './routes/dashboard';
import session from 'express-session';
import path from 'path';
import isLoggedIn from './middleware/authenticate';
import MongoStore from 'connect-mongo';
import notesRouter from './routes/notes';
import profileRouter from './routes/profile';
import cors from 'cors'
require('dotenv').config()

const flash = require('connect-flash')

const port = process.env.PORT
const mongo_url = process.env.mongo_url

const app = express();

connectDB(mongo_url);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(flash());
app.use(cors());

app.use(session({
    name: 'user_sid',
    secret: 'SECRET',
    cookie: { maxAge: 1000 * 60 * 1000},
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: mongo_url})
}));

app.use(express.static('public'))
app.set('views', path.join('public','views'))
app.set('view engine', 'ejs')


app.get('/', (_req, res) => {
    res.render('homepage')
})

app.use('/api/users', usersRouter)
app.use('/api/dashboard', isLoggedIn, dbRouter)
app.use('/api/profile', isLoggedIn, profileRouter)
app.use('/api/note/', isLoggedIn, notesRouter)

app.use((error: Error, _req: any, _res: any, next: Function) => {
    if (error){
        console.log(error)
        next()
    }
})

app.use('*', (_req, res) => {
    res.render('invalidRoute')
})

app.listen(port, () => {
    console.log(`server is listening on port: ${port}`)
})


