const sequelize = require("./db");
const Sequelize = require("sequelize"); // class import มาจาก sequelize

const User = require("./user.model");
const Role = require("./role.model");
const Teacher = require("./teacher.model");
const Judge = require("./judge.model");
const Admin = require("./admin.model");
const VerificationToken = require("./verificationToken.model");

const db = {}; // Object
db.sequelize = sequelize; // เป็น instance จาก db
db.Sequelize = Sequelize;

db.User = User; // db.User เป็น attribute type เป็น User ก็คือเรา assign class User ไปที่ object db.User
db.Role = Role;
db.Admin = Admin;
db.Teacher = Teacher;
db.Judge = Judge;
db.VerificationToken = VerificationToken;

// association
db.VerificationToken.belongTo(db.User, { foreigKey: "userId" }); // one
db.User.belongTo(db.VerificationToken, { foreigKey: "userId" });

module.exports = db;
