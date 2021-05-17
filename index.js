const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const planets = require('./planets');

app.use(bodyParser.json());
app.use(cors({ allow: true }));

const port = process.env.PORT || 3000;

app.get('/planets', (req, res) => {
  res.status(200).send(planets);
});

app.get('/planets/:id', (req, res) => {
  const id = Number(req.params.id);
  const result = planets.filter((planet) => planet.id === id);
  if (result.length) {
    res.status(200).send(planets.filter((planet) => planet.id === id));
  } else {
    res.status(404).send({ message: 'Error: No planets with that ID found' });
  }
});

app.post('/planets', (req, res) => {
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
  const sortedPlanets = [...planets].sort((a, b) => b.id - a.id);
  const currentHighestID = sortedPlanets[0].id;
  // create new id
  const newID = currentHighestID + 1;
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
    planetToAdd.id = newID;
    // add planet to data file
    planets.push(planetToAdd);
    // send response
    res.status(201).send({
      message: `${planetToAdd.name} succesfully added`,
      planet: planetToAdd,
    });
  } else {
    res.status(400).send({ message: 'Unable to create planet' });
  }
});

app.put('/planets/:id', (req, res) => {
  const id = Number(req.params.id);
  const indexToUpdate = planets.findIndex((planet) => planet.id === id);
  if (indexToUpdate >= 0) {
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
      planetToUpdate.id = id;
      planets.splice(indexToUpdate, 1, planetToUpdate);
      res.status(200).send({
        message: `Planet with id of ${id} updated`,
        planet: planetToUpdate,
      });
    }
  } else {
    res.status(400).send({ message: 'Unable to update planet.' });
  }
});

app.delete('/planets/:id', (req, res) => {
  const id = Number(req.params.id);
  const indexToDelete = planets.findIndex((planet) => planet.id === id);
  if (indexToDelete >= 0) {
    planets.splice(indexToDelete, 1);
    res.status(200).send({
      message: `Death star activated. You deleted planet with id of ${id}`,
    });
  } else {
    res
      .status(400)
      .send({ message: 'Unable to delete planet. Invalid planet id' });
  }
});

app.listen(port, () => {
  console.log(`express app listening on port ${port}`);
});
