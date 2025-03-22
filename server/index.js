const express = require("express");
const cors = require("cors");
const path =require("path");
const defineAssociations = require("./db/relations");
const authRoutes = require("./routes/auth");
const passport = require("passport");
const sessionMiddlware = require("./middlwares/sessionMiddlware");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const verifyIfAuthentificated = require("./middlwares/verifyIfAuthenticated");
require("dotenv").config();

const app = express();

require("./config/passport-local-setup");

const client_url = process.env.CLIENT_URL;
const corsOptions={
    origin: [client_url], // Replace with your frontend's URL
    credentials: true, // This allows cookies to be sent with the request
    allowedHeaders: "Content-Type, Authorization", // Add headers you need
};
app.use(cors(corsOptions));
app.use(express.json());

// Define associations
defineAssociations();  

app.use(sessionMiddlware);    
app.use(passport.initialize());
app.use(passport.session()); 

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    
app.get("/",(req,res)=>{
    res.json({message:"ping pong ping pong"})
})

app.use("/api/auth",authRoutes);   
app.use("/api/users",verifyIfAuthentificated,userRoutes);    
app.use("/api/posts",verifyIfAuthentificated,postRoutes);
app.use("/api/comments",verifyIfAuthentificated,commentRoutes);    



const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("the server is lestening on the port :",port)
})
