const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const eventSchema = new Schema({
    eventName: { type: String, required: true},  
    fullAddress: { type: String, required: true },
    location: { type: String, enum: ["Sants", "Gracia", "Poble Nou", "Raval"], required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    duration: { type: Number, required: true },
    price: { type: String },
    category: { type: String, enum: ["culture", "music", "bar", "coffee"], required: true  },
    coordinates: {type: {type: String, type: String} },
    meetupLink: {type: String}
});


const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
