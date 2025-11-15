import { MongoClient } from 'mongodb';

let db; 

async function connectToDb() {
  try { 

    const uri = process.env.DBURL || "mongodb://localhost:27017";
    const dbName = "etlPipelineDb"; 

    const client = new MongoClient(uri);
    await client.connect();
    
    db = client.db(dbName); 
    console.log(`Successfully connected to MongoDB`);
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1); // Exit the application if DB connection fails
  }
}

function getDb() {
  // This now READS the module-level 'db' variable
  if (!db) {
    throw new Error("Database not initialized! Check connection.");
  }
  return db;
}

export { connectToDb, getDb };