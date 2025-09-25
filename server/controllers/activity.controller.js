const Activity = require("../models/activity.model.js");
const activityController = {};
const { Op } = require("sequelize");

activityController.create = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    } = req.body;

    if (
      !name ||
      !description ||
      !type ||
      !level ||
      !team_size ||
      !date ||
      !location ||
      !reg_open ||
      !reg_close ||
      !contact_name ||
      !contact_phone ||
      !contact_email ||
      !status
    ) {
      return res
        .status(400)
        .json({ message: "please provide all required fields" });
    }

    await Activity.findOne({ where: { name: name } }).then((activity) => {
      if (activity) {
        return res.status(400).send({ message: "activity already existed!" });
      }

      const newActivity = {
        name,
        description,
        type,
        level,
        team_size,
        date,
        location,
        reg_open,
        reg_close,
        contact_name,
        contact_phone,
        contact_email,
        status,
      };

      Activity.create(newActivity)
        .then((data) => {
          res.send(data);
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message || "Something error while creating the activity",
          });
        });
    });
  } catch (error) {
    console.log("error while creating controller " + error);
    res.status(500).send({
      message: error.message || "Something error while fetching the activity",
    });
  }
};

activityController.getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    await Activity.findByPk(id).then((activity) => {
      if (!activity) {
        res.status(404).send({ message: `not found activity with id ${id}` });
      } else {
        res.send(activity);
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something error while getting activity with id" });
  }
};

activityController.getAll = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    if (!activities) {
      return res.send({ message: "No Activity~" });
    }
    res.send(activities);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something error while getting all activity" });
  }
};

activityController.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "id are required!" });
    }

    const deleted = await Activity.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ message: "Activity not found!" });
    }

    res.send({ message: "Activity deleted successfully!" });
  } catch (error) {
    console.log("error while deleting controller " + error);
    res.status(500).send({
      message: error.message || "Something error while deleting the activity",
    });
  }
};

activityController.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required!" });
    }

    // ตรวจสอบว่ามี activity อยู่หรือไม่
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found!" });
    }

    // เตรียม object สำหรับ update (จะอัปเดตเฉพาะ field ที่ส่งมา)
    const updatedActivity = {
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    };

    await Activity.update(updatedActivity, { where: { id } });

    // ดึงข้อมูลใหม่หลังอัปเดตกลับมา
    const result = await Activity.findByPk(id);

    res.status(200).json(result);
  } catch (error) {
    console.log("error while updating controller " + error);
    res.status(500).send({
      message:
        error.message || "Something went wrong while updating the activity",
    });
  }
};

activityController.searchActivities = async (req, res) => {
  try {
    const {
      name,
      type,
      level,
      status,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "DESC",
    } = req.query;

    const whereClause = {};

    if (name) {
      whereClause.name = { [Op.iLike]: `%${name}%` }; // partial match
    }

    if (type) {
      whereClause.type = type;
    }

    if (level) {
      whereClause.level = level;
    }

    if (status) {
      whereClause.status = status;
    }

    const offset = (page - 1) * limit;

    const activities = await Activity.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, order]], // e.g., sortBy=name&order=ASC
    });

    res.status(200).json({
      total: activities.count,
      page: parseInt(page),
      pageSize: parseInt(limit),
      totalPages: Math.ceil(activities.count / limit),
      data: activities.rows,
    });
  } catch (error) {
    console.log("error searching activities:", error);
    res
      .status(500)
      .json({ message: "something went wrong while searching activities" });
  }
};

module.exports = activityController;
