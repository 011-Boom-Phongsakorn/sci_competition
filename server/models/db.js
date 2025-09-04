const { Sequelize } = require('sequelize')
const dbConfig = require('../config/db.config')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.DIALECT,
    logging: false
})

const Connection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been etablished successfully");
    } catch (error) {
        console.log("Unable to connect to the database!", error);
    }
}

Connection()
module.exports = sequelize