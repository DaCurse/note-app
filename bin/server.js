#!/usr/bin/env node

import createDebug from 'debug';
import dotenv from 'dotenv';
import { createServer } from 'http';
import createApp from '../app.js';
import prisma from '../providers/prisma.js';

dotenv.config();

const debug = createDebug('note-app:server');

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(port, error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(addr) {
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

function onClose() {
  prisma.$disconnect();
}

async function bootstrap() {
  const app = await createApp();
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  const server = createServer(app);
  server.listen(port);
  server.on('error', onError.bind(null, port));
  server.on('listening', onListening.bind(null, server.address()));
  server.on('close', onClose);
}

bootstrap();
