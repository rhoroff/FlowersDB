var flowers = require('../controllers/flowers.server.controller.js'),
  features = require('../controllers/features.server.controller.js'),
  sightings = require('../controllers/sightings.server.controller.js'),
  user = require('../controllers/user.server.controller.js');

  router = express.Router();

router.route('/flowers')
  .get(flowers.list);
  //.post(flowers.create)

router.route('/flowers/:curFlowerName')
  .get(flowers.read);

router.param('curFlowerName', flowers.getFlowerImage)

router.route('/sightings')
  .get(sightings.list)
  .post(sightings.add);

router.route('/sightings/:flowerName')
  .get(sightings.read);

router.param('flowerName', sightings.sightingByFlowerName)

router.route('/features')
  .get(features.list);

router.route('/locations')
  .get(features.locations);

router.route('/user')
  .get(user.getCurrentUser);



// router.route('/listings/:listingId')
//   .get(listings.read)
//   .put(listings.update)
//   .delete(listings.delete);




module.exports = router;
