const { DataTypes} = require("sequelize");
const sequelize = require("./index");

const Post = sequelize.define("Post",{
    postText:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    postImagePath:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    timestamps:true
})

module.exports = Post;