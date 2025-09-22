const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const db = require("../models/index");
const User = db.User;
const { sendVerificationEmail } = require("../utils/email");
const path = require("path");
// random token
const crypto = require("crypto");
console.log(authConfig);
// Register
const signUp = async (req, res) => {
  const { email, password, type, name } = req.body;

  try {
    // validation request check
    if (!email || !password || !type || !name) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields!" });
    }
    // check user type is valid
    const allowedTypes = ["admin", "teacher", "judge"]; // กำหนดประเภทที่อนุญาต ถ้าทำเป็น enum ก็ได้ แต่ จะ error
    if (!allowedTypes.includes(type)) {
      return res.status(400).send({ message: "Invalid user type!" });
    }

    // check additional fields for teacher type
    const { school, phone } = req.body; // ดึงข้อมูล school และ phone จาก request body
    if (type === "teacher" && (!school || !phone)) {
      // ถ้า type เป็น teacher ต้องมี school และ phone ด้วย
      return res
        .status(400)
        .send({ message: "Please provide school and phone for teacher type!" });
    }

    // check email already exists
    const existingUser = await User.findOne({ where: { email: email } }); // หา user ที่มี email ตรงกับที่ส่งมา
    // ไม่ใช้ then เพราะมี await
    if (existingUser) {
      return res.status(400).send({ message: "Email is already in use!" });
    }

    //Create user object
    const userData = { email, password, type, name, isVerified: false }; // สร้าง object userData จากข้อมูลที่ได้รับมา
    if (type === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }

    // create new user
    const user = await User.create(userData);

    //if user is a teacher , create and sent verification email
    if (type === "teacher") {
      try {
        //create verification token
        const token = crypto.randomBytes(32).toString("hex"); // สร้าง token แบบสุ่ม 32 bytes แล้วแปลงเป็น hex string ฐาน 16
        const verification = await db.VerificationToken.create({
          token,
          userId: user.id,
          expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // หมดอายุใน 24 ชั่วโมง
        });
        console.log("verification token created ", verification);

        //send verification email
        //TODO Send verifycayion email
        await sendVerificationEmail(user.email, token, user.name);
        console.log("Verfication email sent successfully");
      } catch (error) {
        console.log("Error sending verifycation email", error);
      }
    }

    res.status(201).send({
      message:
        user.type === "teacher"
          ? "Registration successfully! Please check your email to verify your account"
          : "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "teacher" && { isVerified: user.isVerified }), // เพิ่ม isVerified ถ้า type เป็น teacher

        //ที่ต้องใช้ object นี้เพราะ เดี๋ยวใช้ user password จะหลุดออกไปด้วย
      },
    }); // 201 successfully created
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating the user.",
    });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).send({ message: "token is missing!" });
  }

  try {
    const verificationToken = await db.VerificationToken.findOne({
      where: { token: token }, // token แรก คือ field ที่อยู่ใน table token ที่สอง คือ ที่รับเข้ามา
    });

    if (!verificationToken) {
      return res.status(404).send({ message: "Invalid verification token" });
    }

    // check if token is expired
    if (new Date() > verificationToken.expiredAt) {
      await verificationToken.destroy();
      return res
        .status(400)
        .send({ message: "Verification token has expired" });
    }

    const user = await db.User.findByPk(verificationToken.userId);
    if (!user) {
      return res.status(400).send({ message: "user not found" });
    }

    await user.update({ isVerified: true });
    // ลบ token เพราะ one time use ใช้ครั้งเดียว
    await verificationToken.destroy();
    //  return web view
    // cwd is current working directory
    // join is connect path auto
    const htmlPath = path.join(
      process.cwd(),
      "views",
      "verification-success.html"
    );
    console.log("htmlpathhhhhhhhhhhhh", htmlPath);
    res.sendFile(htmlPath);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "some error occurred while verifying the user",
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "email are password are required!" });
    }

    // User บอกชื่อ modal ไปเลยเช่น User modal
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "user not found!" });
    }

    const passwordIsvalid = await user.comparePassword(password);
    if (!passwordIsvalid) {
      // 401 ยืนยันตัวตนไม่ผ่าน
      return res.status(401).send({ message: "invalid password" });
    }

    if (user.type === "teacher" && !user.isVerified) {
      return res.status(403).send({ message: "Please verify your email!" });
    }

    // payload คือ ข้อมูลที่จะแนบไป (ใช้)
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      message: "Login Successfuly",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        // ... จะสลายโครงสร้าง จะเป็นโครงสร้างใหม่พวกนี้ก็จะถูกเพิ่ม
        ...(user.type === "teacher" && {
          isVerified: user.isVerified,
          school: user.school,
          phone: user.phone,
        }),
      },
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "some error courred while logging in user",
    });
  }
};

const authController = { signUp, verifyEmail, signIn };
module.exports = authController;
