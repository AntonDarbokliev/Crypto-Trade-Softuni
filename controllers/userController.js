const { errorHelper } = require("../utils/errorHelpers.js");
const { register, login } = require("../services/userService.js");
// const animalService = require("../services/animalService.js");
// const { isAuthorized } = require("../middlewares/authMiddleware.js");



const userController = require("express").Router();

userController.get("/register", async (req, res) => {
  try {
    res.render("register", {
      title: "Register",
    });
  } catch (err) {
    const errors = errorHelper(err)
    res.render('register',{
      title : 'Register',
      errors
    })
  }
});

userController.post("/register", async (req, res) => {
  try {
    const token = await register(req.body);
    res.cookie('auth',token,{httpOnly : true})
    res.redirect('/')
  } catch (err) {
    const errors = errorHelper(err)
    res.render('register',{
      title : 'Register',
      errors
    })
  }
});


userController.get("/login", async (req, res) => {
    try {
      res.render("login", {
        title: "Login",
      });
    } catch (err) {
      const errors = errorHelper(err)
      res.render('login',{
        title : 'Login',
        errors
      })
    }
  });
  
  userController.post("/login", async (req, res) => {
    try {
      const token = await login(req.body);
      res.cookie('auth',token,{httpOnly : true})
      res.redirect('/')
    } catch (err) {
      const errors = errorHelper(err)
      res.render('login',{
        title : 'Login',
        errors
      })
    }
  });
  

module.exports = userController;