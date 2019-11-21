const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const userSchema = new Schema({
    username: { type: String, required: true, unique: true }, // username = email with @ restriction
    password: { type: String, required: true },
    location: { type: String, enum: ["Sants", "Gracia", "Poble Nou", "Raval"] },
    keywords: { type: [] },
    dayPlan: { type: [] }
});


const User = mongoose.model("User", userSchema);
module.exports = User;
