const { Model, DataTypes } = require("sequelize");

class Star extends Model {
  static init(sequelize) {
    super.init(
      {
        date: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Star",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Star, {
      foreignKey: "repo_id",
      through: "stars",
      as: "repository",
    });

    this.belongsToMany(models.Star, {
      foreignKey: "user_id",
      through: "stars",
      as: "user",
    });
  }
}

module.exports = Star;
