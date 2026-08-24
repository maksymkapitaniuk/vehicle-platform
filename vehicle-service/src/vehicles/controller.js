import { Vehicle } from '../db/schema.js';

const vehiclesController = {
  create(dto) {
    return Vehicle.create(dto);
  },

  findAll() {
    return Vehicle.find();
  },

  findById(id) {
    return Vehicle.findById(id);
  },

  updateById(id, dto) {
    return Vehicle.findByIdAndUpdate(
      id,
      { $set: dto },
      { returnDocument: 'after', runValidators: true },
    );
  },

  deleteById(id) {
    return Vehicle.findByIdAndDelete(id);
  },
};

export default vehiclesController;
