const router = require('express').Router({ mergeParams: true });
const controller = require('../controllers/linksController');

router.route("/")
    .get(controller.getAllForMap)
    .post(controller.create);

router.route("/:linkId")
    .get(controller.getSingle)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;