const express = require("express");
const cors = require("cors");
const path = require("path");
const defineAssociations = require("./db/relations");
const authRoutes = require("./routes/auth");
const passport = require("passport");
const sessionMiddleware = require("./middlwares/sessionMiddlware"); // Fixed folder name
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const verifyIfAuthenticated = require("./middlwares/verifyIfAuthenticated"); // Fixed folder name
require("dotenv").config();

const app = express();
// ✅ Trust Render's proxy
app.set("trust proxy", 1); 
// Load Passport configuration before using it
require("./config/passport-local-setup");

const client_url = process.env.CLIENT_URL;
const corsOptions = {
  origin: [client_url], 
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization"], // Fixed format
};

// Define associations
defineAssociations();

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);  // Fixed variable name
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route for debugging session
app.get("/", (req, res) => {
  console.log("Session Data:", req.session); // Debugging
  res.json({ message: "ping pong ping pong" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", verifyIfAuthenticated, userRoutes);
app.use("/api/posts", verifyIfAuthenticated, postRoutes);
app.use("/api/comments", verifyIfAuthenticated, commentRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("The server is listening on port:", port);
});
