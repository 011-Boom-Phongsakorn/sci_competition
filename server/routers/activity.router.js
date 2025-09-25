const express = require("express");
const router = express.Router();

const activityController = require("../controllers/activity.controller.js");

const {
  isAdmin,
  isJudge,
  isTeacher,
  verifyToken,
} = require("../middleware/authJwt.js");

router.post("/", verifyToken, isAdmin, activityController.create);
router.get("/search", activityController.searchActivities);
router.get("/:id", activityController.getActivityById);
router.get("/", activityController.getAll);
router.delete("/:id", verifyToken, isAdmin, activityController.deleteById);
router.put("/:id", verifyToken, isAdmin, activityController.updateById);

module.exports = router;
