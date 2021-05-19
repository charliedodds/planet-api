// const planets = require('../planets');
const Planet = require('../models/planets');

exports.index = (req, res, next) => {
  // res.status(200).send(planets);
  Planet.find()
    .sort([['id', 'ascending']])
    .exec((err, planets) => {
      if (err) return next(err);
      res.status(200).send(planets);
    });
};

exports.getPlanet = (req, res, next) => {
  const id = Number(req.params.id);
  // const result = planets.filter((planet) => planet.id === id);
  Planet.findById(req.params.id).exec((err, planet) => {
    if (err) return next(err);
    res.status(200).send(planet);
  });
  // if (result.length) {
  //   res.status(200).send(planets.filter((planet) => planet.id === id));
  // } else {
  //   res.status(404).send({ message: 'Error: No planets with that ID found' });
  // }
};

exports.createPlanet = (req, res, next) => {
  let planetToAdd = {};
  if (typeof req.body.hasKnownLife === 'boolean') {
    planetToAdd = {
      name: String(req.body.name),
      hasKnownLife: req.body.hasKnownLife,
      type: String(req.body.type),
      noOfMoons: Number(req.body.noOfMoons),
      // ...req.body,
    };
  }
  // get current highest id from data
  // const sortedPlanets = [...planets].sort((a, b) => b.id - a.id);
  // const currentHighestID = sortedPlanets[0].id;
  // create new id
  // const newID = currentHighestID + 1;
  // check planetToAdd is same shape
  const planetKeys = Object.keys(planetToAdd);
  if (
    planetKeys.length === 4 &&
    planetKeys.includes('name', 'hasKnownLife', 'type', 'noOfMoons') &&
    planetToAdd.name &&
    planetToAdd.type &&
    planetToAdd.noOfMoons >= 0
  ) {
    // attach new id to planet
    // planetToAdd.id = newID;
    // add planet to data file
    const planet = new Planet({ ...planetToAdd });
    planet.save((err) => {
      if (err) return next(err);
    });
    // send response
    res.status(201).send({
      message: `${planetToAdd.name} succesfully added`,
      planet: planetToAdd,
    });
  } else {
    res.status(400).send({ message: 'Unable to create planet' });
  }
};

exports.updatePlanet = (req, res, next) => {
  const id = req.params.id;
  // const indexToUpdate = planets.findIndex((planet) => planet.id === id);
  // if (indexToUpdate >= 0) {
  let planetToUpdate = {};
  if (typeof req.body.hasKnownLife === 'boolean') {
    planetToUpdate = {
      name: String(req.body.name),
      hasKnownLife: req.body.hasKnownLife,
      type: String(req.body.type),
      noOfMoons: Number(req.body.noOfMoons),
      // ...req.body,
    };
  }
  const planetKeys = Object.keys(planetToUpdate);
  if (
    planetKeys.length === 4 &&
    planetKeys.includes('name', 'hasKnownLife', 'type', 'noOfMoons', 'id') &&
    planetToUpdate.name &&
    planetToUpdate.type &&
    planetToUpdate.noOfMoons >= 0
  ) {
    // planetToUpdate.id = id;
    // planets.splice(indexToUpdate, 1, planetToUpdate);
    Planet.findByIdAndUpdate(id, { ...planetToUpdate }).exec((err, planet) => {
      if (err) return next(err);
      res.status(200).send({
        message: `Planet with id of ${id} updated`,
        planet: planet,
      });
    });
    // res.status(200).send({
    //   message: `Planet with id of ${id} updated`,
    //   planet: planetToUpdate,
    // });
  }
  // } else {
  //   res.status(400).send({ message: 'Unable to update planet.' });
  // }
};

exports.deletePlanet = (req, res, next) => {
  const id = req.params.id;
  // const indexToDelete = planets.findIndex((planet) => planet.id === id);
  // if (indexToDelete >= 0) {
  // planets.splice(indexToDelete, 1);
  Planet.findByIdAndRemove(id, (err) => {
    if (err) return next(err);
    res.status(200).send({
      message: `Death star activated. You deleted planet with id of ${id}`,
    });
  });
  // res.status(200).send({
  //   message: `Death star activated. You deleted planet with id of ${id}`,
  // });
  // } else {
  //   res
  //     .status(400)
  //     .send({ message: 'Unable to delete planet. Invalid planet id' });
  // }
};
