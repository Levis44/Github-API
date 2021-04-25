const { Model, DataTypes } = require("sequelize");

class Token extends Model {
  static init(sequelize) {
    super.init(
      {
        date: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Token",
      }
    );
  }
}

module.exports = Token;
