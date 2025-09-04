const { DataTypes } = require("sequelize")
const sequelize = require('./db.js')

const Activity = sequelize.define("activity", {
    // id ไม่ต้องมีก็ได้มันจะสร้างให้เอง 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    team_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reg_open: {
        type: DataTypes.DATE,
        allowNull: false
    },
    reg_close: {
        type: DataTypes.DATE,
        allowNull: false
    },
    contact_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("draft", "open", "closed", "in_progress", "completed"),
        defaultValue: "draft"
    }
})

Activity.sync({ force: false}).then(() => {
    console.log('table created or already existed')
}).catch((error) => {
    console.log('error while creating table activity', error)
})

module.exports = Activity