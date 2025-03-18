const express = require("express");
const storyRoutes = express.Router();
const Story = require("../db/stories");



storyRoutes.get("/",(req,res)=>{

});
storyRoutes.get("/:storyId",(req,res)=>{
    const {storyId} = req.params;


});
storyRoutes.get("/user/:userId",(req,res)=>{
    const {userId} = req.params;


});
storyRoutes.post("/",(req,res)=>{
    const {postId} = req.params;

});
storyRoutes.put("/:storyId",(req,res)=>{
    const {storyId} = req.params;

});
storyRoutes.delete("/:storyId",(req,res)=>{
    const {storyId} = req.params;


});

module.exports = storyRoutes;