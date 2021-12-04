import createDebug from 'debug';
import express from 'express';
import loadRoutes from './routes/index.js';

const debug = createDebug('note-app:express');

async function createApp() {
  const app = express();

  debug('Loading routes');
  await loadRoutes(app);

  return app;
}

export default createApp;
