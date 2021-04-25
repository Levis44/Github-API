const { Model, DataTypes } = require("sequelize");

class Repository extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        public: DataTypes.BOOLEAN,
        slug: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Repository",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });

    this.hasMany(models.Star, { foreignKey: "repo_id", as: "repository" });
  }
}

module.exports = Repository;
