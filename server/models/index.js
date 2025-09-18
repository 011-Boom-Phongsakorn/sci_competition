const sequelize = require("./db");
const Sequelize = require("sequelize"); // class import มาจาก sequelize

const User = require("./user.model");
const Activity = require("./activity.model");

const VerificationToken = require("./verificationToken.model");

const db = {}; // Object
db.sequelize = sequelize; // เป็น instance จาก db
db.Sequelize = Sequelize;

db.User = User; // db.User เป็น attribute type เป็น User ก็คือเรา assign class User ไปที่ object db.User
db.Activity = Activity;
db.VerificationToken = VerificationToken;

// association
db.VerificationToken.belongsTo(db.User, { foreignKey: "userId" }); // one
db.User.hasMany(db.VerificationToken, { foreignKey: "userId" });

module.exports = db;
