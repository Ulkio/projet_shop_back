import mysql from "mysql2/promise";
import "dotenv";

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10000,
  queueLimit: 0,
});

pool.getConnection().then((res) => {
  console.log(`Connected to database : ${res.config.database}`);
});
export default pool;
