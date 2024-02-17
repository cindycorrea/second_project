const mongoose = require("mongoose");
const mongoBD = require("../mongoDB/connection");
const Builder = require("../mongoose/builder");

const getAllBuilders = async (request, response) => {
  const builders = await Builder.find();
  response.json(builders);
};

const getBuilder = async (request, response) => {
  /*
    #swagger.description = Pull a builder
  */

  const userID = request.params.id;

  try {
    const builder = await Builder.findById(userID);

    response.json(builder);
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ error: "Cannot fetch the builder" });
  }
};

const newBuilder = async (request, response) => {
  /*
    #swagger.description = Create a new builder
  */

  const newBuilder = new Builder({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    favoriteTheme: request.body.favoriteTheme,
    setsOwned: request.body.setsOwned,
    wishList: request.body.wishList,
  });

  try {
    const result = await newBuilder.save();

    console.log(`Inserted with an id of ${result._id}`);
    response.status(201).json(result._id);
  } catch (error) {
    console.error("Error: ", error);
    response.status(500).json({ error: "Did not insert builder" });
  }
};

const updateBuilder = async (request, response) => {
  /*
    #swagger.description = Update a builder
  */
  try {
    // Process the id from the request
    const userID = request.params.id;

    // Create a filter
    const filter = { _id: userID };

    const update = {
      $set: {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        favoriteTheme: request.body.favoriteTheme,
        setsOwned: request.body.setsOwned,
        wishList: request.body.wishList,
      },
    };

    const result = await Builder.findOneAndUpdate(filter, update);
    response.status(204);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({
        error: "Could not update builder",
        message:
          "An error occurred while attempting to update the builder information.",
        code: "UPDATE_FAILED",
        timestamp: "2024-02-16T12:00:00Z",
        status: 500,
      });
  }
};

const deleteBuilder = async (request, response) => {
  /*
    #swagger.description = Delete a builder
  */
  // Get the user id from the request
  const userId = request.params.id;

  try {
    // Find the document and delete it
    const result = await Builder.findByIdAndDelete(userId);
    console.log(`Builder ${result.firstName} has been deleted.`);
    response.status(200).json(`Builder ${result.firstName} has been deleted.`);
  } catch (error) {
    console.error("Error: ", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllBuilders,
  getBuilder,
  newBuilder,
  updateBuilder,
  deleteBuilder,
};
