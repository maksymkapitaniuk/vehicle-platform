import express from 'express';
import { Error, MongooseError } from 'mongoose';
import vehiclesController from './controller.js';
import validate from '../common/middleware/validate.js';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicle-dto.js';

const vehiclesRouter = express.Router();

vehiclesRouter.get('/', async (req, res) => {
  try {
    const vehicles = await vehiclesController.findAll();
    res.json(vehicles);
  } catch (err) {
    if (err instanceof MongooseError) {
      return res.status(500).json({
        message: 'Internal mongoose error',
        errorCode: 'mongoose_error',
        cause: err,
      });
    }
  }
});

vehiclesRouter.post('/', validate(CreateVehicleDto), async (req, res) => {
  try {
    const vehicle = await vehiclesController.create(req.body);
    res.json(vehicle);
  } catch (err) {
    if (
      err instanceof Error.ValidationError ||
      (err instanceof Error.CastError &&
        ['make', 'model', 'year', 'user_id'].includes(err.path))
    ) {
      return res.status(422).json({
        message: 'Invalid DB Entity',
        errorCode: 'mongodb_validation_error',
        path: err.path,
        errors: err.errors
          ? Object.entries(err.errors).map(([key, { message }]) => ({
              field: key,
              message,
            }))
          : undefined,
        cause: err,
      });
    }

    if (err instanceof MongooseError) {
      return res.status(500).json({
        message: 'Internal mongoose error',
        errorCode: 'mongoose_error',
        cause: err,
      });
    }
  }
});

vehiclesRouter.get('/:id', async (req, res) => {
  try {
    const vehicle = await vehiclesController.findById(req.params.id);

    if (!vehicle) {
      res.status(404);
      res.json({
        message: 'Vehicle with such id was not found',
        errorCode: 'entity_not_found_error',
      });
    }

    res.json(vehicle);
  } catch (err) {
    if (err instanceof Error.CastError && err.path === '_id') {
      return res.status(404).json({
        message: 'Vehicle with such id was not found',
        errorCode: 'entity_not_found_error',
      });
    }

    if (err instanceof MongooseError) {
      return res.status(500).json({
        message: 'Internal mongoose error',
        errorCode: 'mongoose_error',
        cause: err,
      });
    }
  }
});

vehiclesRouter.put('/:id', validate(UpdateVehicleDto), async (req, res) => {
  try {
    const vehicle = await vehiclesController.updateById(
      req.params.id,
      req.body,
    );

    if (!vehicle) {
      res.status(404);
      res.json({
        message: 'Vehicle with such id was not found',
        errorCode: 'entity_not_found_error',
      });
    }

    res.json(vehicle);
  } catch (err) {
    if (
      err instanceof Error.ValidationError ||
      (err instanceof Error.CastError &&
        ['make', 'model', 'year', 'user_id'].includes(err.path))
    ) {
      return res.status(422).json({
        message: 'Invalid DB Entity',
        errorCode: 'mongodb_validation_error',
        path: err.path,
        errors: err.errors
          ? Object.entries(err.errors).map(([key, { message }]) => ({
              field: key,
              message,
            }))
          : undefined,
        cause: err,
      });
    }

    if (err instanceof Error.CastError && err.path === '_id') {
      return res.status(404).json({
        message: 'Vehicle with such id was not found',
        errorCode: 'entity_not_found_error',
      });
    }

    if (err instanceof MongooseError) {
      return res.status(500).json({
        message: 'Internal mongoose error',
        errorCode: 'mongoose_error',
        cause: err,
      });
    }
  }
});

vehiclesRouter.delete('/:id', async (req, res) => {
  try {
    const vehicle = await vehiclesController.deleteById(req.params.id);

    if (!vehicle) {
      res.status(404);
      res.json({
        message: 'Vehicle with such id was not found',
        errorCode: 'entity_not_found_error',
      });
    }

    res.json(vehicle);
  } catch (err) {
    if (err instanceof Error.CastError && err.path === '_id') {
      return res.status(404).json({
        message: 'Vehicle with such id was not found',
        errorCode: 'entity_not_found_error',
      });
    }

    if (err instanceof MongooseError) {
      return res.status(500).json({
        message: 'Internal mongoose error',
        errorCode: 'mongoose_error',
        cause: err,
      });
    }
  }
});

export default vehiclesRouter;
