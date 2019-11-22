const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const userSchema = new Schema({
    
    fullName: { type: String},
    email: { type: String, required: true, unique: true }, // username = email with @ restriction
    password: { type: String, required: true },
    location: { type: String, enum: ["Barceloneta", "Forum", "Gracia", "Horta-Guinardó", "Les Corts", "Poble Nou","Port Olimpic", "Port Vell", "Sant Andreu", "Sants", "Sant Martí", "Sarrià-Tibidabo" ] },
    keywords: { type: [] },
    dayPlan: { type: [] }
    // TODO README > dayplan [eventID]
    
},{
    timestamps: {
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
});


const User = mongoose.model("User", userSchema);
module.exports = User;
