const UserController = require("../controllers/user.controller");


module.exports = (app) => {
    app.post("/api/user/register", UserController.register);
    app.post("/api/user/login", UserController.login);
    app.post("/api/user/logout", UserController.logout);
    app.put('/api/user/update/:id', UserController.updateUser);
    app.get("/api/user", UserController.getUser);
    app.delete("/api/users/delete/:id", UserController.deleteUser);
};
