var flowers = require('../controllers/flowers.server.controller.js'),
  features = require('../controllers/features.server.controller.js'),
  sightings = require('../controllers/sightings.server.controller.js');

  router = express.Router();

router.route('/flowers')
  .get(flowers.list);
  //.post(flowers.create)

router.route('/sightings')
  .get(sightings.list);

  router.route('/sightings/:flowerName')
  .get(sightings.read);

  router.param('flowerName', sightings.sightingByFlowerName)

router.route('/features')
  .get(features.list);



// router.route('/listings/:listingId')
//   .get(listings.read)
//   .put(listings.update)
//   .delete(listings.delete);




module.exports = router;
