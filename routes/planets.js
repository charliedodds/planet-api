const express = require('express');
const router = express.Router();

const planetControllers = require('../controllers/planetControllers');

router.get('/', planetControllers.index);

router.get('/:id', planetControllers.getPlanet);

router.post('/', planetControllers.createPlanet);

router.put('/:id', planetControllers.updatePlanet);

router.delete('/:id', planetControllers.deletePlanet);

module.exports = router;
