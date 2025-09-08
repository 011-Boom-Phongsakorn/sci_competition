const User = require("./user.model");

const Judge = User.init(
  {},
  {
    scopes: {
      // กำหนด ขอบเขต ตอน search คือ ตอน findAll() มันจะเติม where ให้ auto
      defaultScope: {
        where: {
          type: "judge",
        },
      },
    },
  },
  {
    hook: {
      // ป้องกัน human error ป้องกันส่ง value ไม่ตรง
      beforeCreate: (teacher) => {
        teacher.type = "judge";
      },
    },
  }
);

module.exports = Judge;
