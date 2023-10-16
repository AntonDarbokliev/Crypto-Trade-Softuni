const { isAuthorized } = require("../middlewares/authMiddleware.js");
const cryptoService = require("../services/cryptoService.js");
const { errorHelper } = require('../utils/errorHelpers.js')

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
      const parsedBuys = JSON.parse(JSON.stringify(crypto.buys))
      const idArr = parsedBuys.map(x => x._id)
      if (idArr.includes(req.user?._id)) {           //CHANGE PROPERTIES ACCORDING TO THE TASK
          hasBought = true
      }
  
    //   const votesString = parsedVotes.map(x => x.email).join(', ')
  
      res.render("details", {
        title: "Details",
        crypto,
        isOwner,
        hasBought,
        // votesString,
        parsedBuys
      });
    } catch (err) {
      const errors = errorHelper(err)
      res.render('details',{
        title : 'Details',
        errors
      });
    }
  });

  cryptoController.get('/:id/buy', isAuthorized,async (req,res) => {
    const cryptoId = req.params.id
    const userId = req.user._id 
  try{
    const crypto = await cryptoService.getById(cryptoId);
    let hasBought = false;
    const parsedBuys = JSON.parse(JSON.stringify(crypto.buys))
    const idArr = parsedBuys.map(x => x._id)
    if (idArr.includes(req.user?._id)) {           
        hasBought = true
    }
    if(hasBought){
        throw new Error('You cannot buy more coins')
    }

    await cryptoService.buy(cryptoId,userId)
    res.redirect(`/crypto/${cryptoId}/details`)
  }catch(err){
    const errors = errorHelper(err)
    res.render('details',{
      title : 'Details',
      errors,
    })
  }
  })

  cryptoController.get("/:id/edit",isAuthorized,async (req, res) => {
    const id = req.params.id;
    const crypto = await cryptoService.getById(id)
    try {
     
      res.render("edit", {
        title: "Edit",
        crypto
      });
    } catch (err) {
      const errors = errorHelper(err)
      res.render("edit", {
        title: "Crypto Edit",
        errors
      });
    }
  });
  
  cryptoController.post("/:id/edit",isAuthorized, async (req, res) => {
    const id = req.params.id;
    const cryptoData = req.body
    const crypto = await cryptoService.getById(id)

    try {
      await cryptoService.edit(id,cryptoData)
      res.redirect(`/crypto/${id}/details`)
     
    } catch (err) {
      const errors = errorHelper(err)
      res.render("edit", {
        title: "Edit",
        errors
      });
    }
  });

  cryptoController.get('/:id/delete',isAuthorized, async (req,res) => {
    const id = req.params.id
    const crypto = await cryptoService.getById(id)
  try{
    await cryptoService.del(id)
    res.redirect('/crypto/catalog')
  }catch(err){
    const errors = errorHelper(err)
      res.render("home", {
        errors
      });
  }
  })
  
  



  module.exports = cryptoController
