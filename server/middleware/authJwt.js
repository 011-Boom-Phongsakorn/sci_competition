const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const db = require("../models/index");

const User = db.User;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No Token Provided!" });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    // encoded เข้ารหัส
    // decoded ถอดรหัส
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
    // next คือส่งให้ node ทำงานต่อไป
  });
};

const isAdmin = (req, res, next) => {
  try {
    User.findByPk(req.userId).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      if (user.type === "admin") {
        next();
        return;
      }
      // 401 ไม่มีสิทธิการเข้าถึง
      return res
        .status(401)
        .send({ message: "Unauthorized access, require admin role!" });
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const isTeacher = (req, res, next) => {
  try {
    User.findByPk(req.userId).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      if (user.type === "teacher") {
        next();
        return;
      }
      // 401 ไม่มีสิทธิการเข้าถึง
      return res
        .status(401)
        .send({ message: "Unauthorized access, require teacher role!" });
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const isJudge = (req, res, next) => {
  try {
    User.findByPk(req.userId).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      if (user.type === "judge") {
        next();
        return;
      }
      // 401 ไม่มีสิทธิการเข้าถึง
      return res
        .status(401)
        .send({ message: "Unauthorized access, require judge role!" });
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// const isModOrAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then((user) => {
//     user.getRoles().then((roles) => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "admin" || roles[i].name === "moderator") {
//           next();
//           return;
//         }
//       }
//       return res
//         .status(401)
//         .send({ message: "Unauthorized access, require admin role!" });
//     });
//   });
// };

const authJwt = { verifyToken, isAdmin, isTeacher, isJudge };
module.exports = authJwt;
