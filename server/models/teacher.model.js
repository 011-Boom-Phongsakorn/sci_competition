const { DataTypes } = require("sequelize");
const User = require("./user.model");

// สืบทอด super class จาก User
// init คือ extends ของ sequelize
const Teacher = User.init(
  {
    // เพิ่ม attribute ของ teacher
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    scopes: {
      // กำหนด ขอบเขต ตอน search คือ ตอน findAll() มันจะเติม where ให้ auto
      defaultScope: {
        where: {
          type: "teacher",
        },
      },
    },
  },
  {
    hook: {
      // ป้องกัน human error ป้องกันส่ง value ไม่ตรง
      beforeCreate: (teacher) => {
        teacher.type = "teacher";
      },
    },
  }
);

module.exports = Teacher;
