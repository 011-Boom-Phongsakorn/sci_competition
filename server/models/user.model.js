const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false,
    },
  },
  {
    hook: {
      beforeCreate: async (user) => {
        if (user.password) {
          // password1234 + hash --> จะ random dfgewx4%2356jsodfwekh ไม่ซ้ำ ถ้าใส่เลขเยอะ จะช้า 8 คือจำนวน salt
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      // ถ้า user เปลี่ยน password
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password); // this ของ class นี้
};

module.exports = User;
