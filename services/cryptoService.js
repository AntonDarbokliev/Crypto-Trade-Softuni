const Crypto = require("../models/Crypto.js");

async function create(cryptoData, userId) {
  const creature = {
    name: cryptoData.name,
    imageUrl: cryptoData.imageUrl,
    price: cryptoData.price,
    description: cryptoData.description,
    paymentMethod: cryptoData.paymentMethod,
    buys: cryptoData.buys,                    // CHANGE PROPERTIES ACCORDING TO THE TASK
    owner: userId,
  };
  const result = await Crypto.create(creature);

  return result;
}

async function getAll() {
  return Crypto.find({}).lean().populate('owner').populate('buys');
}

async function getById(id) {
  return Crypto.findById(id).lean().populate('owner').populate('buys');
}

async function find(location) {
  return Crypto.find({ location: { $regex: location, $options: "i" } }).lean();
}

async function edit(id, data) {
  return Crypto.updateOne({ _id: id }, { $set: data }, { runValidators: true });
}

async function del(id) {
  return Crypto.findByIdAndDelete(id);
}

async function buy(cryptoId,userId){
  return Crypto.findByIdAndUpdate(cryptoId,{$push : {buys : userId}})    // CHANGE FUNCTION NAME AND PROPERTIES ACCORDING TO THE TASK
}

module.exports = {
  create,
  getAll,
  getById,
  find,
  edit,
  del,
  buy,
};
