const MovieModel = require("../model/movie");
const path = require("path");
class MovieController {
  static async addMovie(req, res) {
    try {
      const updatedPath = req.file.path.replace(
        /\/opt\/lampp\/htdocs/,
        "http://ec2-16-171-35-75.eu-north-1.compute.amazonaws.com"
      );

      console.log(updatedPath);
      const result = await MovieModel.addMovie(req.body, updatedPath);
      res.send(result);
    } catch (error) {
      console.error("Error in addMovie controller:", error.message);
      res.status(500).send({ status: false, message: "Internal server error" });
    }
  }

  static async loadMovies(req, res) {
    try {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 10;

      const result = await MovieModel.loadMovies(page, pageSize);
      res.send(result);
    } catch (error) {
      console.error("Error in loadMovies controller:", error.message);
      res.status(500).send({ status: false, message: "Internal server error" });
    }
  }

  static async updateMovie(req, res) {
    const movieId = req.body.movieId;
    const updatedData = req.body;
    const updatedPath = req.file.path.replace(
      /\/opt\/lampp\/htdocs/,
      "http://ec2-16-171-35-75.eu-north-1.compute.amazonaws.com"
    );

    console.log(updatedPath);

    try {
      const result = await MovieModel.updateMovie(
        movieId,
        updatedData,
        updatedPath
      );
      res.send(result);
    } catch (error) {
      console.error("Error in updateMovie controller:", error.message);
      res.status(500).send({ status: false, message: "Internal server error" });
    }
  }
}

module.exports = MovieController;
