const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const dayPlanSchema = new Schema({
    
    date:     { type: Date, required: true},
    name:    { type: String, required: true},
    startingTime: { type: String, required: true },
    endingTime: { type: String, required: true },
    location: { type: String, enum: ["Barceloneta", "Forum", "Gracia", "Horta-Guinardó", "Les Corts", "Poble Nou","Port Olimpic", "Port Vell", "Sant Andreu", "Sants", "Sant Martí", "Sarrià-Tibidabo" ] },
    events:{ type : [] }
    
},{
    timestamps: {
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
});


const User = mongoose.model("User", userSchema);
module.exports = User;
