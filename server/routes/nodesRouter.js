const router = require('express').Router({mergeParams: true});
const controller = require('../controllers/nodesController');
const linksController = require("../controllers/linksController");
const fieldsController = require("../controllers/fieldsController");

const fieldsRouter = require("./fieldsRouter");

router.route("/")
    .get(controller.getAllForMap)
    .post(controller.create);

router.route("/:nodeId")
    .get(controller.getSingle)
    .put(controller.update)
    .delete(controller.delete);

router.route("/:nodeId/links")
    .get(linksController.getAllForNode);

router.use("/:nodeId/fields",fieldsRouter);

module.exports = router;