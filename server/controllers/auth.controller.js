const jwt = require("jsonwebtoken");
const authconfig = require("../config/auth.config");
const db = require("../models/index");
const User = db.User;
// random token
const crypto = require("crypto");

// Register
const signUp = async (req, res) => {
  try {
    const { email, name, password, type, school, phone } = req.body;

    // Check validation request
    if (!email || !name || !password || !type) {
      return res
        .status(400)
        .send({ message: "email, password, type and name are required!" });
    }

    // เราให้แค่ type 3 อันนี้ ให้ login เข้ามา
    // validate user type
    const allowedType = ["admin", "teacher", "judge"];
    if (!allowedType.includes(type)) {
      return res.status(400).send({
        message: "Invalid user type. Must be admin, teacher or judge",
      });
    }

    // Addition validation for teacher
    if (type === "teacher" && (!school || !phone)) {
      return res
        .status(400)
        .send({ message: "school and phone are required for teacher!" });
    }

    // check iif user already exists
    // ถ้าใช้ .then() ไม่ต้องมี await
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(400).send({ message: "Email already in use!" });
    }

    // Create user object on type
    const userData = {
      name: name,
      email: email,
      passowrd: password,
      type: type,
    };

    if (type === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }

    // Create new user
    const user = await User.create(userData);

    // if user is a teacher, create and send verification emal
    if (type === "teacher") {
      try {
        // create verification token
        const token = crypto.randomBytes(32).toString("hex");

        // บันทึก database
        const verification = await db.VerificationToken.create({
          token,
          userId: user.id,
          expiredAt: new Date(Date.new() + 24 * 60 * 60 * 1000), // 24h
        });

        //

      } catch (error) {}
    }

    // 201 success แบบ created
    res.status(201).send({
      message:
        user.type === "teacher"
          ? "registration successfully! please check your email to verify your account"
          : "user registered successfully!",
      //   object(user) ส่งให้ client แต่เราไม่ได้ส่ง password ไปให้ คราวที่แล้วให้ password(-) ที่ create user
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "teacher" && { isVerified: user.isVerified }),
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating the user",
    });
  }
};
