const User = require("./users");
const Comment = require("./comments");
const Post = require("./posts");
const Story = require("./stories");
const Like = require("./likes");
const Follow = require("./follows");

const defineAssociations = function () {
  // User-Post relationship
  Post.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Post, { foreignKey: "userId" });

  // User-Comment relationship
  Comment.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Comment, { foreignKey: "userId" });

  // Post-Comment relationship
  Comment.belongsTo(Post, { foreignKey: "postId" });
  Post.hasMany(Comment, { foreignKey: "postId" });

  // User-Story relationship
  Story.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Story, { foreignKey: "userId" });

  // User-Like-Post many-to-many relationship
  Like.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Like, { foreignKey: "userId" });

  Like.belongsTo(Post, { foreignKey: "postId" });
  Post.hasMany(Like, { foreignKey: "postId" });

  // User-Follow relationship (many-to-many self-referencing association)
  User.belongsToMany(User, {
    through: Follow,
    as: "Followers", // Users following this user
    foreignKey: "followingId",
  });
  User.belongsToMany(User, {
    through: Follow,
    as: "Following", // Users this user follows
    foreignKey: "followerId",
  });
};

module.exports = defineAssociations;
