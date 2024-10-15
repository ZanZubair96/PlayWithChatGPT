const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/loginSystem');
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
