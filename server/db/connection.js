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
  await client.connect();
  //   const res = await client.query("SELECT * FROM blogs LIMIT 1");
  //   console.log(res.rows[0].title);
  //   await client.end();
};

export default connectToDb;
