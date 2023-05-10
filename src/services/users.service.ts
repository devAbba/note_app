import User from "../models/users.model";

async function getOne(field: string, value: string){
    if (field === 'email'){
        const user = await User.findOne({email: value}).select('-password')
        return user
    }
    else if (field === 'username'){
        const user = await User.findOne({username: value}).select('-password')
        return user
    }
    else {
        const user = await User.findById(value).select('-password')
        return user
    }
}

async function authInfo(field: string, value: string){
    if (field === 'email'){
        const user = await User.findOne({'email': value})
        return user
    }
    else {
        const user = await User.findOne({'username': value})
        return user
    }  
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

async function deleteUserNote(user_id: string, note_id: string){
    const retValue = User.updateOne({_id: user_id}, {$pull: {notes: note_id}})
    return retValue
}

export default {
    getOne,
    authInfo,
    newRecord,
    updateRecord,
    deleteUserNote
}