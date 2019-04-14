const Box = require("../models/Box");

class BoxController {
  async store(req, res) {
    // Passando apenas o body, ele adiciona o title ao title do Model, sem a necessidade
    // De criar um novo objeto para mapear um a um.
    const box = await Box.create(req.body);

    return res.json(box);
  }

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: "files",
      options: {
        sort: { createdAt: -1 }
      }
    });

    return res.json(box);
  }
}

module.exports = new BoxController();
