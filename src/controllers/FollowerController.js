const User = require("../models/User");
const Follower = require("../models/Follower");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const follows = await Follower.findAll({
      attributes: ["user_id", "follower_id"],
      where: {
        user_id: user_id,
      },
    });

    if (!follows) {
      return res.status(400).json({ error: "Follow not found" });
    }

    const obj = {
      data: [],
      count: 0,
    };

    for (let i = 0; i < follows.length; i++) {
      let follow = follows[i];

      obj.data.push(follow);
    }

    obj.count = follows.length;

    return res.status(200).json(obj);
  },

  async store(req, res) {
    const { follower_id, user_id } = req.params;

    const searchFollow = await Follower.findAll({
      attributes: ["id"],
      where: {
        follower_id,
        user_id,
      },
    });

    if (searchFollow.length > 0) {
      return res.status(400).json({ error: "Alredy Following" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const follow = await Follower.create({
      user_id,
      follower_id,
      date: new Date(),
    });

    return res.status(201).json(follow);
  },

  async delete(req, res) {
    //      tira o follower do usuário
    const { follower_id, user_id } = req.params;

    const searchFollow = await Follower.findAll({
      attributes: ["id"],
      where: {
        follower_id,
        user_id,
      },
    });

    if (searchFollow.length == 0) {
      return res.status(400).json({ error: "Follow not found" });
    }

    const repo_id = searchFollow[0].id;

    const follow = await Follower.findByPk(repo_id);

    follow.destroy({
      where: { repo_id },
    });

    // return res.json(repo_id);
    return res.status(200).json({ message: "Unfollow done!" });
  },
};
