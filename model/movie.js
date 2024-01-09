const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/dbServer");

const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publishing_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  poster: {
    type: DataTypes.STRING,
  },
});

class MovieModel {
  static async addMovie(param, path) {
    try {
      const movie = await Movie.create({
        title: param.title,
        publishing_year: param.publishing_year,
        poster: path,
      });

      return {
        status: true,
        message: "Movie information added successfully",
        data: movie.toJSON(),
      };
    } catch (error) {
      console.error("Error adding movie information:", error.message);
      return { status: false };
    }
  }

  static async loadMovies(page = 1, pageSize = 10) {
    try {
      const offset = (page - 1) * pageSize;
      const movies = await Movie.findAll({
        limit: pageSize,
        offset: offset,
      });

      return {
        status: true,
        data: movies.map((movie) => movie.toJSON()),
      };
    } catch (error) {
      console.error("Error loading movie information:", error.message);
      return { status: false };
    }
  }

  static async updateMovie(movieId, updatedData, path) {
    try {
      const movie = await Movie.findByPk(movieId);

      if (!movie) {
        return { status: false, message: "Movie not found" };
      }
      const updateData = { ...updatedData, poster: path };
      await movie.update(updateData);

      return {
        status: true,
        message: "Movie information updated successfully",
        data: movie.toJSON(),
      };
    } catch (error) {
      console.error("Error updating movie information:", error.message);
      return { status: false };
    }
  }
}

module.exports = MovieModel;
