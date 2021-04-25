const User = require("../models/User");
const Repository = require("../models/Repository");
const Star = require("../models/Star");

module.exports = {
  async getSpecificRepo(req, res) {
    const { repo_id } = req.params;

    const repo = await Repository.findByPk(repo_id);

    if (!repo) {
      return res.status(400).json({ error: "User not found" });
    }

    const stars = await Star.count({
      where: {
        repo_id,
      },
    });

    repo.setDataValue("stars", stars);

    return res.status(200).json(repo);
  },

  async index(req, res) {
    /**
     *  tela de repositórios é necessário retornar um objeto
     *  { data: (array de repositório com suas respectivas stars),
     *   count: quantidade de itens retornados. }
     */

    const { user_id } = req.params;

    const repos = await Repository.findAll({
      attributes: ["id", "name", "description", "public", "user_id"],
      where: {
        user_id,
      },
    });

    //numero de repos
    const reposCount = await Repository.count({
      where: {
        user_id: user_id,
      },
    });

    const obj = {
      data: [],
      count: reposCount,
    };

    for (let i = 0; i < repos.length; i++) {
      let repo = repos[i];
      let id = repo.getDataValue("id");

      const stars = await Star.count({
        where: {
          repo_id: id,
        },
      });

      repo.setDataValue("stars", stars);
      let dataRepo = repo["dataValues"];

      obj.data.push(dataRepo);
    }

    return res.status(200).json(obj);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { name, description, public } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const makeSlug = (username, repoName) => username + "-" + repoName;

    const slug = makeSlug(user.username, name);

    const repository = await Repository.create({
      user_id,
      name,
      description,
      public,
      slug,
    });

    return res.status(201).json(repository);
  },

  async delete(req, res) {
    const { repo_id } = req.params;

    const repo = await Repository.findByPk(repo_id);

    if (!repo) {
      return res.status(400).json({ error: "Repository not found" });
    }

    repo.destroy({
      where: { repo_id },
    });

    return res.status(201).json({ message: "Repository deleted" });
  },

  async change(req, res) {
    const { repo_id } = req.params;
    const { description, public } = req.body;

    const repo = await Repository.findByPk(repo_id);

    if (!repo) {
      return res.status(400).json({ error: "Repository not found" });
    }

    repo.update({
      description,
      public,
    });

    return res.status(201).json(repo);
  },
};
