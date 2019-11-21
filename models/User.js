const mongoose = require('mongoose');
const Schema = mongoose.Schema; //(just gettin the funtion by the name, but it is a parenthesis)

const userSchema = new Schema({
    userID: String,
    name: String,
    email: String,
    password: String,
    location: [String],
    keywords: [Strings],
    dayPlan: [Obj]
});
const User = mongoose.model('User', userSchema);
module.exports = User;