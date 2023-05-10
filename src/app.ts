import connectDB from './database/mongodb';
import app from './index'
require('dotenv').config();


const PORT = process.env.PORT || 5000
const DB_URL: string | undefined = process.env.mongo_url

if (DB_URL){
    connectDB(DB_URL);
}


app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
})

