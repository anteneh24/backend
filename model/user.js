const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/dbServer");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

class UserModel {
  static async login(username, password) {
    try {
      const user = await User.findOne({
        where: {
          username: username,
        },
        attributes: ["id", "username", "password"],
      });
      console.log(user.dataValues.password);
      const passwordMatch = await bcrypt.compare(
        password,
        user.dataValues.password
      );
      console.log(passwordMatch + " ((((((((((((((((");
      if (!passwordMatch) {
        return { status: false, message: "Invalid username or password" };
      }

      return {
        status: true,
        data: user.toJSON(),
      };
    } catch (error) {
      console.error("Error during login:", error.message);
      return { status: false, message: "Internal server error" };
    }
  }
}

module.exports = UserModel;
