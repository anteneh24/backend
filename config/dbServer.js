const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL database");
    await sequelize.sync(); // Synchronize the model with the database
    console.log("Models synchronized");
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error.message);
  }
};
const queryDatabase = async () => {
  try {
    // Your database query logic here
    console.log("Executing database query...");
  } catch (error) {
    console.error("Error querying the database:", error.message);
  }
};
connectToDatabase();
// .then(() => queryDatabase())
// .catch((error) => console.error(error));

module.exports = sequelize;
