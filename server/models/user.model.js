const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.sync({ force: false })
  .then(() => {
    console.log("Table created or already existed");
  })
  .catch((error) => {
    console.log("Error creating table", error);
  });

module.exports = User