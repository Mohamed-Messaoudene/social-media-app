const express = require("express");
const cors = require("cors");
const path =require("path");
const defineAssociations = require("./db/relations");
const authRoutes = require("./routes/auth");
const passport = require("passport");
const sessionMiddlware = require("./middlwares/sessionMiddlware");
const verifyIfAuthentificated = require("./middlwares/verifyIfAuthenticated");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

const app = express();

require("./config/passport-local-setup");
require("./config/passport-google-setup");

const corsOptions={
    origin: "http://localhost:5173", // Replace with your frontend's URL
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
    res.json({message:"rani hna"})
})
app.get("/ressource",verifyIfAuthentificated,(req,res)=>{
    res.send("hi welcome you are authenticated")
})
app.use("/api/auth",authRoutes);   
app.use("/api/users",userRoutes);    
app.use("/api/posts",postRoutes);
app.use("/api/comments",commentRoutes);    

// app.use("/api/story",storyRoutes);  



app.listen(5000,()=>{
    console.log("the server is lestening on the port 5000")
})
