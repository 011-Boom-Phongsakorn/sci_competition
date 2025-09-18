const express = require("express");

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
// const restaurantRouter = require("./routers/restaurant.router");
const cors = require("cors");
const FRONTEND_URL = process.env.FRONTEND_URL;
const NODE_ENV = process.env.NODE_ENV || "development";

const activityRouter = require("./routers/activity.router");

// ต้องอยู่ข้างบน .json
app.use(
  cors({
    // origin ต้นทางมาจากไหนได้บ้าง
    origin: ["http://localhost:5173", "127.0.0.1:5173", FRONTEND_URL],
    // อุญาติให้ ใช้ method ไรบ้าง หรือ service
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

const authRouter = require("./routers/auth.router");
const db = require("./models/index");

const initDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection established successfully");
    if (NODE_ENV === "development") {
      await db.sequelize.sync({ alter: true });
      console.log("database synced in development mode");
    }
  } catch (error) {
    console.error("unable to connect to database", error);
  }
};

initDatabase();

// เวลาไปแก้ type หรือ แก้ไขโครงสร้าง มันจะทำของเก่าเราต้องเปิด sync ด้วย เพื่อให้มันจำค่าใหม่ (เมื่อแก้ schema ใหม่ ต้องซิง ใหม่ด้วย)
// เปิดปิดใหม่เพื่อให้ โครงสร้างมันซิง กับ model
// db.sequelize.sync({ force: true }).then(() => {
//   initRole();
//   console.log("Drop and Sync");
// });

// แปลง จาก string(text) เป็น json
app.use(express.json());
// tooltip
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

// use routers
// app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/activitys", activityRouter);

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
