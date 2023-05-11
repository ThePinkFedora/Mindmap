const router = require('express').Router({mergeParams: true});
const controller = require('../controllers/fieldsController');

router.route("/")
    .get(controller.getAllForNode)
    .post(controller.create);

router.route("/:fieldId")
    .get(controller.getSingle)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;