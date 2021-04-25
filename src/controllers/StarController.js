const User = require("../models/User");
const Follower = require("../models/Follower");

const Repository = require("../models/Repository");
const Star = require("../models/Star");

module.exports = {
  async index(req, res) {
    const { repo_id } = req.params;

    const stars = await Star.findAll({
      attributes: ["user_id", "repo_id"],
      where: {
        repo_id: repo_id,
      },
    });

    if (!stars) {
      return res.status(400).json({ error: "Follow not found" });
    }

    return res.status(200).json(stars);

    return res.status(200).json(repo);
  },

  async store(req, res) {
    const { repo_id, user_id } = req.params;

    const searchFollow = await Star.findAll({
      attributes: ["id"],
      where: {
        repo_id,
        user_id,
      },
    });

    if (searchFollow.length > 0) {
      return res.status(400).json({ error: "Alredy starred" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const star = await Star.create({
      user_id,
      repo_id,
      date: new Date(),
    });

    return res.status(201).json(star);
  },

  async delete(req, res) {
    const { repo_id, user_id } = req.params;

    const searchFollow = await Star.findAll({
      attributes: ["id"],
      where: {
        repo_id,
        user_id,
      },
    });

    if (searchFollow.length == 0) {
      return res.status(400).json({ error: "Follow not found" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const star_id = searchFollow[0].id;

    const star = await Star.findByPk(star_id);

    star.destroy({
      where: { star_id },
    });

    // return res.json(repo_id);
    return res.status(200).json({ message: "Unfollow done!" });
  },
};
