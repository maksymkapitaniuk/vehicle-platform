import express from 'express';
import vehiclesController from './controller.js';

const vehiclesRouter = express.Router();

vehiclesRouter.get('/', async (req, res) => {
  const vehicles = await vehiclesController.findAll();
  res.json(vehicles);
});

vehiclesRouter.post('/', async (req, res) => {
  const vehicle = await vehiclesController.create(req.body);
  res.json(vehicle);
});

vehiclesRouter.get('/:id', async (req, res) => {
  const vehicle = await vehiclesController.findById(req.params.id);

  if (!vehicle) {
    res.status(404);
    res.json({ message: 'Vehicle with such id was not found' });
  }

  res.json(vehicle);
});

vehiclesRouter.put('/:id', async (req, res) => {
  const vehicle = await vehiclesController.updateById(req.params.id, req.body);

  if (!vehicle) {
    res.status(404);
    res.json({ message: 'Vehicle with such id was not found' });
  }

  res.json(vehicle);
});

vehiclesRouter.delete('/:id', async (req, res) => {
  const vehicle = await vehiclesController.deleteById(req.params.id);

  if (!vehicle) {
    res.status(404);
    res.json({ message: 'Vehicle with such id was not found' });
  }

  res.json(vehicle);
});

export default vehiclesRouter;
