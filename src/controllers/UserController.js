const Repository = require("../models/Repository");
const User = require("../models/User");
const Follower = require("../models/Follower");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.status(200).json(users);
  },

  async getSpecificUser(req, res) {
    const { user_id } = req.params;

    /**
     * Deve trazer o nome, username, email, local, n. de seguidores, n. de repos,
     * n. de pessoas quesegue e bio
     */

    const user = await User.findByPk(user_id, {
      attributes: ["name", "username", "avatar", "local", "email", "bio"],
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const repos = await Repository.count({
      where: {
        user_id: user_id,
      },
    });

    const followers = await Follower.count({
      where: {
        user_id: user_id,
      },
    });

    const following = await Follower.count({
      where: {
        follower_id: user_id,
      },
    });

    user.setDataValue("repositories", repos);
    user.setDataValue("followers", followers);
    user.setDataValue("following", following);

    return res.status(201).json(user);
  },

  async store(req, res) {
    const { name, email, local, avatar, username, bio } = req.body;

    const userExists = await User.findOne({
      where: {
        name,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: "User alredy exists" });
    }

    const user = await User.create({
      name,
      email,
      local,
      avatar,
      username,
      bio,
    });

    return res.status(201).json(user);
  },

  async delete(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.destroy({
      where: { user_id },
    });

    return res.status(201).json({ message: "User deleted" });
  },

  async change(req, res) {
    const { user_id } = req.params;
    const { username, bio } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.update({
      username,
      bio,
    });

    return res.status(201).json(user);
  },
};
