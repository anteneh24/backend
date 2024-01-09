const UserModel = require("../model/user");

class UserController {
  static async login(req, res) {
    const { username, password } = req.body;
    console.log(password);

    try {
      const result = await UserModel.login(username, password);
      res.send(result);
    } catch (error) {
      console.error("Error in login controller:", error.message);
      res.status(500).send({ status: false, message: "Internal server error" });
    }
  }
}

module.exports = UserController;
