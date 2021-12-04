import createDebug from 'debug';
import express from 'express';
import errorHandler from './middleware/error-handler.js';
import notFoundHandler from './middleware/not-found-handler.js';
import loadRoutes from './routes/index.js';

const debug = createDebug('note-app:express');

async function createApp() {
  const app = express();

  debug('Loading routes');
  await loadRoutes(app);

  app.use(errorHandler);
  app.use(notFoundHandler);

  return app;
}

export default createApp;
