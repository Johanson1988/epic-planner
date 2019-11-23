const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const dayPlanSchema = new Schema({
    
    date:     { type: Date, required: true},
    name:    { type: String, required: true},
    startingTime: { type: String},
    endingTime: { type: String},
    events:{ type : [] }
    
},{
    timestamps: {
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
});


const DayPlan = mongoose.model("dayPlan", dayPlanSchema);
module.exports = DayPlan;
