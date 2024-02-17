const mongoose = require("mongoose");
const Set = require("../mongoose/sets");
const mongoDB = require("../mongoDB/connection");

const allSets = async (request, response) => {
  const sets = await Set.find();
  response.json(sets);
};

const getSet = async (request, response) => {
  /*
    #swagger.description = Pull a lego set 
  */
  const userID = request.params.id;
  try {
    const result = await Set.findById(userID);

    response.json(result);
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ error: "Cannot fetch the set" });
  }
};

const newSet = async (request, response) => {
  /*
    #swagger.description = Create a new lego set
  */

  const newSet = new Set({
    setNumber: request.body.setNumber,
    setName: request.body.setName,
    theme: request.body.theme,
    pieces: request.body.pieces,
    ages: request.body.ages,
    price: request.body.price,
    availability: request.body.availability,
    image: request.body.image,
  });

  try {
    const result = await newSet.save();

    console.log(`Inserted with an id of ${result._id}`);
    response.status(201).json(result._id);
  } catch (error) {
    console.error("Error: ", error);
    response.status(500).json({ error: "Did not insert" });
  }
};

const updateSet = async (request, response) => {
  /*
    #swagger.description = Update a lego set data
  */
  const userID = request.params.id;

  const update = {
    $set: {
      setNumber: request.body.setNumber,
      setName: request.body.setaName,
      theme: request.body.theme,
      pieces: request.body.pieces,
      ages: request.body.ages,
      price: request.body.price,
      availability: request.body.availability,
      image: request.body.image,
    },
  };

  try {
    const filter = { _id: userID };

    const result = await Set.findOneAndUpdate(filter, update);
    response.status(204);
  } catch (error) {
    console.error("Here is the error: ", error);
    response.status(500).json("Could not update the set.");
  }
};

const deleteSet = async (request, response) => {
  /*
    #swagger.description = Delete a lego set data
  */
  const userID = request.params.id;

  try {
    const result = await Set.findByIdAndDelete(userID);

    console.log(`Set ${result._id} successfully deleted.`);
    response.status(200).json(`Set ${result._id} successfully deleted.`);
  } catch (error) {
    console.error("Here is the error: ", error);
    response.status(500).json("Could not delete the set.");
  }
};

module.exports = { allSets, getSet, newSet, updateSet, deleteSet };
