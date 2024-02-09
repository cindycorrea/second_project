const { request, response } = require("express");
const mongoDB = require("../mongoDB/connection");
const ObjectId = require("mongodb").ObjectId;

const test = async (request, response) => {
  const client = await mongoDB.connectDB();
  console.log("It is working.");
  response.json("I actually know what I am doing.");
};

const getBuilder = async (request, response) => {
  /*
    #swagger.description = Pull a builder
  */
  const client = await mongoDB.connectDB();

  try {
    const userID = new ObjectId(request.params.id);

    const collection = client.db("second_project").collection("builders");

    const result = collection.find({ _id: userID });

    const resultArray = await result.toArray();

    response.json(resultArray);
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ error: "Cannot fetch the builder" });
  } finally {
    await client.close();
  }
};

const newBuilder = async (request, response) => {
  /*
    #swagger.description = Create a new builder
  */
  const client = await mongoDB.connectDB();

  const newBuilder = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    favoriteTheme: request.body.favoriteTheme,
    setsOwned: request.body.setsOwned,
    wishList: request.body.wishList,
  };

  try {
    const collection = client.db("second_project").collection("builders");

    const result = await collection.insertOne(newBuilder);

    console.log(`Inserted with an id of ${result.insertedId}`);
    response.status(201).json(result.insertedId);
  } catch (error) {
    console.error("Error: ", error);
    response.status(500).json({ error: "Did not insert builder" });
  } finally {
    client.close();
  }
};

const updateBuilder = (request, response) => {
  /*
    #swagger.description = Update a builder
  */
  console.log("This function will update.");
};

const deleteBuilder = (request, response) => {
  /*
    #swagger.description = Delete a builder
  */
  console.log("This function will delete.");
};

module.exports = { test, getBuilder, newBuilder, updateBuilder, deleteBuilder };
