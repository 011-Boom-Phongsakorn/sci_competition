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
        return res.stauts(400).send({ message: "activity already existed!" });
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

activityController.getAll = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.status(200).json(activities);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong while getting all activities" });
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
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something error while getting all activity" });
  }
};

activityController.searchActivities = async (req, res) => {
  try {
    const { name, type, level, status } = req.query;

    const whereClause = {};

    if (name) {
      whereClause.name = { [Op.iLike]: `%${name}%` };
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

    const activities = await Activity.findAll({ where: whereClause });
    res.status(200).json(activities);
  } catch (error) {
    console.log("error searching activities:", error);
    res
      .status(500)
      .json({ message: "something went wrong while searching activities" });
  }
};

module.exports = activityController;
