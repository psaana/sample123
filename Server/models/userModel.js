import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    technology: String,
    location: String
});

export default class UserModel {
    constructor() {
        return mongoose.model('UserTable', userSchema);
    }
}
