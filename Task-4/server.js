import 'dotenv/config';
import connectDB from './src/config/db.js';
import app from './src/app.js';

console.log('app.js loaded');

const PORT = process.env.PORT || 3000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});