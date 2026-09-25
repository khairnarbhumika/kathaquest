import app from './app.js';
import { runMigrationsAndSeed } from './db/seed.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('Initializing KathaQuest Database & Seeds...');
    await runMigrationsAndSeed();

    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(` KathaQuest Backend API listening on port ${PORT}`);
      console.log(` API Endpoint: http://localhost:${PORT}/api/v1/health`);
      console.log(`====================================================`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
