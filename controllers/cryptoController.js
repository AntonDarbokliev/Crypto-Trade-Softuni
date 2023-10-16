const { isAuthorized } = require("../middlewares/authMiddleware.js");
const cryptoService = require("../services/cryptoService.js");

const cryptoController = require("express").Router();


cryptoController.get("/create",isAuthorized, (req, res) => {
    res.render("create", {
      title: "Add crypto",
    });
  });

cryptoController.post("/create",isAuthorized, async (req, res) => {
    try {
      await cryptoService.create(req.body,req.user._id);
      res.redirect("/");
    } catch (err) {
      const errors = errorHelper(err)
      res.render('create',{
        title : 'Create',
        errors
      });
    }
  });

  cryptoController.get("/catalog", async (req, res) => {
    try {
      const cryptos = await cryptoService.getAll();
      res.render("catalog", {
        title: "Crypto Catalog",
        cryptos,
      });
    } catch (err) {
        const errors = errorHelper(err)
        res.render('catalog',{
          title : 'Crypto Catalog',
          errors
        });
    }
  });

  cryptoController.get("/:id/details", async (req, res) => {
    try {
      const crypto = await cryptoService.getById(req.params.id);
      const isOwner = req.user?._id == crypto.owner._id
      let hasBought = false;
      const parsedVotes = JSON.parse(JSON.stringify(crypto.votes))
      const idArr = parsedVotes.map(x => x._id)
      if (idArr.includes(req.user?._id)) {           //CHANGE PROPERTIES ACCORDING TO THE TASK
          hasBought = true
      }
  
      const votesString = parsedVotes.map(x => x.email).join(', ')
  
      res.render("details", {
        title: "Details",
        crypto,
        isOwner,
        hasBought,
        votesString,
        parsedVotes
      });
    } catch (err) {
      const errors = errorHelper(err)
      res.render('details',{
        title : 'Details',
        errors
      });
    }
  });



  module.exports = cryptoController
