const router = require('express').Router({mergeParams: true});
const controller = require('../controllers/mapsController');
const nodeSearchController = require('../controllers/nodeSearchController');

//Routers
const nodesRouter = require('./nodesRouter');
const linksRouter = require('./linksRouter');

router.route("/")
    .get(controller.getAll)
    .post(controller.create);



router.route("/:mapId")
    .get(controller.getSingle)
    .put(controller.update)
    .delete(controller.delete);


router.get('/:mapId/node-search',nodeSearchController.searchNodes);
router.use('/:mapId/nodes', nodesRouter);
router.use('/:mapId/links', linksRouter);



module.exports = router;