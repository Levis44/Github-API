const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        local: DataTypes.STRING,
        avatar: DataTypes.STRING,
        username: DataTypes.STRING,
        bio: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "User",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Repository, {
      foreignKey: "user_id",
      as: "repositories",
    });

    this.hasMany(models.Token, {
      foreignKey: "user_id",
      as: "tokens",
    });

    //usuário
    this.hasMany(models.Follower, {
      foreignKey: "user_id",
      as: "user",
    });

    //follower
    this.hasMany(models.Follower, {
      foreignKey: "follower_id",
      as: "follower",
    });

    this.hasMany(models.Star, {
      foreignKey: "user_id",
      as: "stars",
    });
  }
}

module.exports = User;
