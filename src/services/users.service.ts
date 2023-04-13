import User from "../models/users.model";

async function getOne(query: object){
    const user = await User.findOne(query).select('-password')
    return user
}

async function authInfo(query: object){
    const user = await User.findOne(query)
    return user
}

async function newRecord(data: object){
    const userToSave = new User(data)
    const savedUser = await userToSave.save()
    return savedUser
}

async function updateRecord(id: string, data: object){
    const user = await User.findByIdAndUpdate(id, data)
    return user
}

export default {
    getOne,
    authInfo,
    newRecord,
    updateRecord
}