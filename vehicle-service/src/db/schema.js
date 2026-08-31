import mongoose from 'mongoose';

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) {
  throw new Error('Cannot connect to MongoDB: No connection string provided');
}

try {
  await mongoose.connect(connectionString);
  console.log('Successfully connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1);
}

mongoose.connection.on('error', (error) => {
  console.error('MongoDB runtime error:', error.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

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
    required: function () {
      const value =
        this instanceof mongoose.Document ? this.year : this.get('year');

      return value === undefined;
    },
    validate: {
      validator: function (v) {
        return v === null || typeof v === 'number';
      },
      message: 'Year is required and has to be Number or exactly "null".',
    },
  },
  user_id: {
    type: Number,
    required: true,
  },
});

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
