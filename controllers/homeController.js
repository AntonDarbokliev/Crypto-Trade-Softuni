// const { getAll } = require("../services/animalService.js");

const homeController = require("express").Router();

homeController.get("/", async (req, res) => {
  try {
    res.render("home", {
      title: "Home",
      
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = homeController;
