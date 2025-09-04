const Restaurant = require("../models/restaurant.model");
const restaurantController = {};

// Create and save a new restaurant
restaurantController.create = async (req, res) => {
  try{
    const { name, type, imageUrl } = req.body;
  // validate data
  if (!name || !type || !imageUrl) {
    res
      .status(400)
      .send({ message: "Name, Type or ImageUrl can not be empty!" });
    return;
  }

  await Restaurant.findOne({ where: { name: name } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({ message: "Restaurant already exists!" });
      return;
    }
    const newRestaurant = {
      name: name,
      type: type,
      imageUrl: imageUrl,
    };

    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message: error.message || "Something error while creating the restaurant",
        });
      });
    });
  }catch(e){
    console.log(e)
  }
  
};

restaurantController.getAll = async (req, res) => {
  try{
    await Restaurant.findAll()
    .then((rest) => {
      res.send(rest)
    })
  }catch(e){
    res.status(500).send({
      message: e.message || "Something error while getting all restaurant"
    })
  }
}

restaurantController.getById = async (req, res) => {
  try{
    const { id } = req.params
    await Restaurant.findByPk(id)
    .then((data) => {
      if(!data){
        res.status(404).send({ message: `No Found Restaurant with id ${id}`})
      } else {
        res.send(data)
      }
    })
  }catch(e){
    res.status(500).send({
      message: error.message || "Something error while getting restaurant with id"
    })
  }
}

restaurantController.update = async (req, res) => {
  try{
    const { name, type, imageUrl } = req.body
    const { id } = req.params
    // vilidate data
    if(!name && !type && !imageUrl){
      res.status(400).json({ message: `Name, Type, ImageUrl can not emtry!`})
      return;
    }
      
    await Restaurant.update({ name: name, type: type, imageUrl}, { where: { id: id}})
    .then((n) => {
      if(n[0] === 1){
        res.send({ message: `Restaurant update successfully!` })
      }else{
        res.status(404).send({ message: `Can not update restaurant with id ${id}. Maybe restaurant was not found or req. body is emety!` })
      }
    })
  }catch(e){
    res.status(500).send({
      message: error.message || "Server Error"
    })
  }
}

restaurantController.deleteById = async (req, res) => {
  try{
    const { id } = req.params
    if(!id) {
      res.status(404).send({ message: `Id is missing`})
      return;
    }
    await Restaurant.destroy({ where: { id: id }})
    .then((n) => {
      if(n === 1) {
        res.send({message: `Restaurant was deleted successfully.`})
      }else {
        res.status(404).send({ message: `Can not deleted restaurant with id ${id}. Maybe restaurant was not found or req. body is emety!` })
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Server Error",
      });
    });
  }catch(e){
    res.status(500).send({
      message: error.message || "Server Error"
    })
  }
}

module.exports = restaurantController;
