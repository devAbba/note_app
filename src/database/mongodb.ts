import mongoose from 'mongoose';

const connectDB = (url: any): void => {
    mongoose.connect(url)

    mongoose.connection.on("connected", () => {
        console.log("connected to mongodb successfully")
    })

    mongoose.connection.on("error", (error) => {
        console.log("there was a problem connecting to mongodb")
        console.log(error)  
    })
}

export default connectDB;