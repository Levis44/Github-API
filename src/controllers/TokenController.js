const User = require("../models/User");
const Token = require("../models/Token");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const tokens = await Token.findAll({
      attributes: ["id", "date"],
      where: {
        user_id: user_id,
      },
    });

    if (!tokens) {
      return res.status(400).json({ error: "Tokens not found" });
    }

    return res.status(200).json(tokens);
  },

  async store(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const token = await Token.create({
      user_id,
      date: new Date(),
    });

    return res.status(201).json(token);
  },
};
