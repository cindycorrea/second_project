const { request, response } = require("express");
const mongoDB = require("../mongoDB/connection");
const ObjectId = require("mongodb").ObjectId;

const test = async (request, response) => {
  const client = await mongoDB.connectDB();
  console.log("It is working.");
  response.json("I actually know what I am doing.");
};

const getCindy = async (request, response) => {
  const client = await mongoDB.connectDB();

  try {
    const userID = new ObjectId(request.params.id);

    const collection = client.db("second_project").collection("whatever");

    const result = collection.find({ _id: userID });

    const resultArray = await result.toArray();

    response.json(resultArray);
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ error: "Cannot fetch Cindy" });
  } finally {
    await client.close();
  }
};

const postMario = async (request, response) => {
  const client = await mongoDB.connectDB();

  const mario = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    favoriteColor: request.body.favoriteColor,
    birthday: request.body.birthday,
  };

  try {
    console.log("Received Mario data:", mario);

    const collection = client.db("second_project").collection("whatever");

    const result = await collection.insertOne(mario);

    console.log(`Inserted with an id of ${result.insertedId}`);
    response.status(201).json(result.insertedId);
  } catch (error) {
    console.error("Error: ", error);
    response.status(500).json({ error: "Did not insert" });
  } finally {
    client.close();
  }
};

module.exports = { test, getCindy, postMario };
