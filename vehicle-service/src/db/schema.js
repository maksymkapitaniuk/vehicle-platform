import mongoose from 'mongoose';

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) {
  throw new Error('Cannot connect to MongoDB: No connection string provided');
}

await mongoose.connect(connectionString);

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
});

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
