const Event = require("../models/event.model");

const EventController = {
    createEvent: (req, res) => {
        Event.create(req.body)
            .then((newEvent) => res.json({ event: newEvent }))
            .catch((err) => res.status(400).json({ message: 'createEvent has failed!', error: err }));
    },
    updateEvent: (req, res) => {
        Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((updatedEvent) => res.json({ event: updatedEvent }))
            .catch((err) => res.status(400).json({ message: 'updateEvent has failed!', error: err }));
    },
    deleteEvent: (req, res) => {
        Event.deleteOne({ _id: req.params.id })
            .then((result) => res.json({ result: result }))
            .catch((err) => res.status(400).json({ message: 'deleteEvent has failed!', error: err }));
    },
    findEventById: (req, res) => {
        console.log("findEventById called with ID:", req.params.id);
        Event.findOne({ _id: req.params.id })
            .then((oneSingleEvent) => {
                if (!oneSingleEvent) {
                    return res.status(404).json({ message: 'Event not found!' });
                }
                res.json({ event: oneSingleEvent });
            })
            .catch((err) => {
                console.error("Error in findEventById:", err);
                res.status(500).json({ message: 'Internal server error', error: err.message });
            });
    },
    
        
    findAllEvents: (req, res) => {
        Event.find()
            .then((allEvents) => res.json({ events: allEvents }))
            .catch((err) => res.status(400).json({ message: 'findAllEvents has failed!', error: err }));
    }
};

module.exports = EventController;




