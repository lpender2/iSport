const express = require("express"); 
const cors = require("cors");
const app = express();                
const cookieParser = require("cookie-parser");





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials:true, origin:"http://localhost:3000" }));
app.use(cookieParser());
app.use((req, res, next) => {
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request Body:', req.body);
    next();
});


require("./config/mongoose.config");
require("./routes/event.routes")(app);
require("./routes/user.routes")(app);
require('dotenv').config();


app.listen(8000, ()=>console.log("Listening on Port 8000"));             
