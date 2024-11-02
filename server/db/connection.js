import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;
export const client = new Client({
  user: "postgres",
  password: "Rupanjan@2004",
  host: "localhost",
  port: process.env.DB_PORT,
  database: "blog-app",
});

const connectToDb = async () => {
  try {
    await client.connect();
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.log(err.message);
  }
};

export default connectToDb;
