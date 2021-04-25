const { Model, DataTypes } = require("sequelize");

class Follower extends Model {
  static init(sequelize) {
    super.init(
      {
        date: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Follower",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: "follower_id",
      through: "followers",
      as: "follower",
    });

    this.belongsToMany(models.User, {
      foreignKey: "user_id",
      through: "followers",
      as: "user",
    });
  }
}

module.exports = Follower;
