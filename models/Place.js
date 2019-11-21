const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const placeSchema = new Schema({
    placeName: { type: String, required: true},  
    fullAddress: { type: String, required: true },
    location: { type: String, enum: ["Sants", "Gracia", "Poble Nou", "Raval"], required: true },
    openingSchedule: { type: String, required: true },
    category: { type: String, enum: ["eat", "cocktail", "dance", "coffee"], required: true  },
    coordinates: {type: {type: String, type: String} },
    webLink: {type: String}
});


const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
