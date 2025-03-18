const { DataTypes} = require("sequelize");
const sequelize = require("./index");

const Story = sequelize.define("Story",{
    photo:{
        type:DataTypes.STRING,
        allowNull:false
    },  
},{
    timestamps:true
})

module.exports = Story;