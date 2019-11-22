const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const dayPlanSchema = new Schema({
    
    date:     { type: Date, required: true},
    name:    { type: String, required: true},
    startingTime: { type: String, required: true },
    endingTime: { type: String, required: true },
    events:{ type : [] }
    
},{
    timestamps: {
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
});


const User = mongoose.model("User", userSchema);
module.exports = User;
