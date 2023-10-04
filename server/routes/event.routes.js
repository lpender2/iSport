const EventController = require("../controllers/event.controller");


module.exports = (app) => {
    app.get("/api/events/:id", EventController.findEventById);
    app.put("/api/events/:id", EventController.updateEvent);
    app.delete("/api/events/:id", EventController.deleteEvent);
    app.get("/api/events", EventController.findAllEvents);
    app.post("/api/events", EventController.createEvent);

    
}
