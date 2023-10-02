const express = require("express"); 
const cors = require("cors");
const app = express();                
const cookieParser = require("cookie-parser");

require("./config/mongoose.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials:true, origin:"http://localhost:3000" }));
app.use(cookieParser());


require("./routes/event.routes")(app);
require("./routes/user.routes")(app);
require('dotenv').config();


app.listen(8000, ()=>console.log("Listening on Port 8000"))             
