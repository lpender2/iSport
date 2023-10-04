const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "An event's title is required!!!"],
        maxlength: [100, "The title's length can be no more than 100 characters!"]
    },
    date: {
        type: Date,
        required: [true, "An event's date is required!!!"]
    },
    time: {
        type: String,
        required: [true, "An event's time is required!!!"]
    },
    location: {
        type: String,
        required: [true, "An event's location is required!!!"]
    },
    coordinates: {  
        latitude: {
            type: Number,
            required: [true, "Latitude is required!!!"]
        },
        longitude: {
            type: Number,
            required: [true, "Longitude is required!!!"]
        }
    },
    userId: {
        type: String,
        required: [true, "A user ID is required!!!"]
    },
    messages: [
        {
            text: {
                type: String,
                trim: true,
                required: true
            },
            userFirstName: {
                type: String,
                trim: true,
                required: true
            }
        }
    ]
}, { timestamps: true });

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;



