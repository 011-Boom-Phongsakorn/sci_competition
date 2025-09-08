const User = require("./user.model");

const Admin = User.init(
  {},
  {
    scopes: {
      // กำหนด ขอบเขต ตอน search คือ ตอน findAll() มันจะเติม where ให้ auto
      defaultScope: {
        where: {
          type: "admin",
        },
      },
    },
  },
  {
    hook: {
      // ป้องกัน human error ป้องกันส่ง value ไม่ตรง
      beforeCreate: (teacher) => {
        teacher.type = "admin";
      },
    },
  }
);

module.exports = Admin;
