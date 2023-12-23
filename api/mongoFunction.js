// Import necessary modules
const { log } = require("console");
const { MongoClient } = require("mongodb");

// Define your serverless function
module.exports = async (req, res) => {
  // MongoDB connection string
  const uri = process.env.MONGODB_URI;

  // Create a MongoDB client
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Perform MongoDB operations here
    const database = client.db("your-database");
    const collection = database.collection("your-collection");

    // Example: Insert a document
    const result = await collection.insertOne({
      citat: "Thinking is a nightmare, doing is a blessing",
    });
    //console.log(`Inserted document with _id: ${result.insertedId}`);
    const data = await collection.find({}).toArray();
    // Respond with success message
    res.status(200).json({ message: "Data inserted successfully}", data });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
};
