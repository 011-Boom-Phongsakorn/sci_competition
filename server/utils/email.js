const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config(); // โหลดค่าตัวแปรจากไฟล์ .env เข้าสู่ process.env
const { getVerificationEmailTemplate } = require("./emailTemplate");
// create gmail transpotter
//ถ้าอยู่ใน Docker ให้ใช้ service
const transpotter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

//verify SMTP Connection Configutation
transpotter.verify(function (error, success) {
  if (error) {
    console.error("SMTP Connection Error", error);
  } else {
    console.log("SMTP Server is ready to send mail");
  }
});

//send verifycation mail
const sendVerificationEmail = async (email, token, userName) => {
  const verificationUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${token}`;

  const mailOptions = {
    from: {
      name: "ระบบการแข่งขันวันวิทยศาตร์",
      email: process.env.EMAIL_FROM,
    },
    to: email,
    subject: "กรุณายืนยันอีเมลของคุณ - ระบบการแข่งขันวันวิทยศาตร์",
    html: getVerificationEmailTemplate(verificationUrl, userName),
    text: `Welcome to day Science Day!\n\nเรียน คุณ ${userName}, \n\n ขอบคุณที่ลงทะเบียนเข้าร่วมระบบการแข่งขันทางวิทยาศาสตร์ เรายินดีเป็นอย่างยิ่งที่ได้ต้อนรับคุณเข้าสู่ระบบ
    กรุณายืนยันอีเมลของคุณเพื่อดำเนินการลงทะเบียนให้เสร็จสมบูรณ์และเข้าใช้งานระบบ\n\n
    ⚠️ ลิงก์ยืนยันอีเมลนี้จะหมดอายุภายใน 24 ชั่วโมง\n\nหากคุณไม่ได้เป็นผู้ลงทะเบียน กรุณาละเว้นการคลิกลิงก์นี้<\n\n${verificationUrl} \n\n นี่เป็นข้อความอัตโนมัติ กรุณาอย่าตอบกลับอีเมลนี้`,
  };
  try {
    const info = await transpotter.sendMail(mailOptions);
    console.log("verification email send successfully");
    return info;
  } catch (error) {
    console.error("Error sending email", error);
  }
};

module.exports = { sendVerificationEmail };
