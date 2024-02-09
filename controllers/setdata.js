const { request, response } = require("express");
const mongoDB = require("../mongoDB/connection");
const ObjectId = require("mongodb").ObjectId;

const test = async (request, response) => {
  const client = await mongoDB.connectDB();
  console.log("It is working.");
  response.json("I actually know what I am doing.");
};

const getSet = async (request, response) => {
  /*
    #swagger.description = Pull a lego set 
  */
  const client = await mongoDB.connectDB();

  try {
    const userID = new ObjectId(request.params.id);

    const collection = client.db("second_project").collection("setdata");

    const result = collection.find({ _id: userID });

    const resultArray = await result.toArray();

    response.json(resultArray);
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ error: "Cannot fetch the set" });
  } finally {
    await client.close();
  }
};

const newSet = async (request, response) => {
  /*
    #swagger.description = Create a new lego set
  */

  const client = await mongoDB.connectDB();

  const newSet = {
    setNumber: request.body.setNumber,
    setName: request.body.setName,
    theme: request.body.theme,
    pieces: request.body.pieces,
    ages: request.body.ages,
    price: request.body.price,
    availability: request.body.availability,
    image: request.body.image,
  };

  try {
    const collection = client.db("second_project").collection("setdata");

    const result = await collection.insertOne(newSet);

    console.log(`Inserted with an id of ${result.insertedId}`);
    response.status(201).json(result.insertedId);
  } catch (error) {
    console.error("Error: ", error);
    response.status(500).json({ error: "Did not insert" });
  } finally {
    client.close();
  }
};

const updateSet = (request, response) => {
  /*
    #swagger.description = Update a lego set data
  */
  console.log("This function will update.");
};

const deleteSet = (request, response) => {
  /*
    #swagger.description = Delete a lego set data
  */
  console.log("This function will delete.");
};

module.exports = { test, getSet, newSet, updateSet, deleteSet };
