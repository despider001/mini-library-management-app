import app from './app';
import logger from './config/loggerConfig';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('uncaughtException', (error: Error) => {
  logger.error(`uncaughtException: ${error.message}`);
  process.exit(1);  // Exiting process
});

process.on('unhandledRejection', (reason: {} | null | undefined, promise: Promise<any>) => {
  logger.error(`Unhandled Rejection at: Promise ${promise}, reason: ${reason}`);
  process.exit(1);  // Exiting process
});
